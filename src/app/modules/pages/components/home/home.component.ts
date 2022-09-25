import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { tap, delay, Observable, Subscription } from 'rxjs';
import { getRandomNumberInRange } from 'src/app/modules/helpers/random.helpers';
import { MathConstants } from 'src/app/modules/models/constants/math.constants';
import { PersonalData } from 'src/app/modules/models/personal-data.model';
import { RandomOptions } from 'src/app/modules/models/random-options.model';
import { PersonalDataService } from 'src/app/modules/services/personal-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private page: number = 0;
  private requests$: Subscription[] = [];

  public selectedCountry: string = 'ru';
  public countries: string[] = ['ru', 'us', 'pl'];

  public optionsFormGroup = new FormGroup({
    errors: new FormControl(0),
    country: new FormControl(this.selectedCountry),
    seed: new FormControl(0),
  });

  public dataSource: MatTableDataSource<PersonalData> =
    new MatTableDataSource<PersonalData>([]);
  public displayedColumns: string[] = [
    'index',
    'identifier',
    'fullName',
    'address',
    'phone',
  ];

  constructor(private readonly personalDataService: PersonalDataService) {}

  ngOnInit(): void {
    this.optionsFormGroup.valueChanges
      .pipe(
        tap(() => {
          this.resetData();
        })
      )
      .subscribe();

    this.randomizeSeed();
  }

  public handleScroll(scrolled: boolean) {
    scrolled ? this.getData() : _.noop();
  }

  public randomizeSeed() {
    const seed = getRandomNumberInRange(
      MathConstants.IntMinValue,
      MathConstants.IntMaxValue - 1000
    );

    this.optionsFormGroup.setValue({
      country: this.optionsFormGroup.value.country ?? null,
      errors: this.optionsFormGroup.value.errors ?? null,
      seed: seed,
    });
  }

  public exportData() {
    console.log(this.dataSource.data);
  }

  private getRandomOptions() {
    const options = {
      seed: this.optionsFormGroup.value.seed,
      country: this.optionsFormGroup.value.country,
      errorsCount: this.optionsFormGroup.value.errors,
      size: 30,
    } as RandomOptions;

    return options;
  }

  private getData() {
    this.page += 1;

    const options = this.getRandomOptions();
    const request = this.personalDataService.getData(options, this.page).pipe(tap(data => {
      const personalData = [...this.dataSource.data, ...data];
      this.dataSource = new MatTableDataSource(personalData);

      request.unsubscribe();
      this.requests$ = this.requests$.filter(storedRequest => storedRequest !== request);
    }))
    .subscribe();

    this.requests$.push(request);
  }

  private resetData() {
    this.requests$.forEach(request => request.unsubscribe())
    this.requests$ = [];

    this.page = 0;
    this.dataSource = new MatTableDataSource<PersonalData>([]);

    this.getData();
  }
}
