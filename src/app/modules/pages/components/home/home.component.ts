import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { tap } from 'rxjs';
import { getRandomNumberInRange } from 'src/app/modules/helpers/random.helpers';
import { MathConstants } from 'src/app/modules/models/constants/math.constants';
import { PersonalData } from 'src/app/modules/models/personal-data.model';

const TEMP_DATA: PersonalData[] = [
  {
    index: 1,
    identifier: 'smth',
    fullName: 'fullName',
    address: 'address',
    phone: 'phone',
  },
  {
    index: 2,
    identifier: 'smth',
    fullName: 'fullName',
    address: 'address',
    phone: 'phone',
  },
  {
    index: 3,
    identifier: 'smth',
    fullName: 'fullName',
    address: 'address',
    phone: 'phone',
  },
  {
    index: 4,
    identifier: 'smth',
    fullName: 'fullName',
    address: 'address',
    phone: 'phone',
  },
  {
    index: 5,
    identifier: 'smth',
    fullName: 'fullName',
    address: 'address',
    phone: 'phone',
  },
  {
    index: 1,
    identifier: 'smth',
    fullName: 'fullName',
    address: 'address',
    phone: 'phone',
  },
  {
    index: 2,
    identifier: 'smth',
    fullName: 'fullName',
    address: 'address',
    phone: 'phone',
  },
  {
    index: 3,
    identifier: 'smth',
    fullName: 'fullName',
    address: 'address',
    phone: 'phone',
  },
  {
    index: 4,
    identifier: 'smth',
    fullName: 'fullName',
    address: 'address',
    phone: 'phone',
  },
  {
    index: 5,
    identifier: 'smth',
    fullName: 'fullName',
    address: 'address',
    phone: 'phone',
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private page: number = 0;

  public errorsCount: number = 0;
  public selectedCountry: string = 'ru';
  public countries: string[] = ['ru', 'us', 'pl'];

  public optionsFormGroup = new FormGroup({
    errors: new FormControl(0),
    country: new FormControl(this.selectedCountry),
    seed: new FormControl(0),
  });

  public dataSource!: MatTableDataSource<PersonalData>;
  public displayedColumns: string[] = [
    'index',
    'identifier',
    'fullName',
    'address',
    'phone',
  ];

  ngOnInit(): void {
    this.optionsFormGroup.valueChanges
      .pipe(
        tap(() => {
          // ToDo: regenerate data
          console.log(this.optionsFormGroup.value);
        })
      )
      .subscribe();

    this.randomizeSeed();
    this.getData();
  }

  public handleScroll(scrolled: boolean) {
    scrolled ? this.getData() : _.noop();
  }

  public randomizeSeed() {
    const seed = getRandomNumberInRange(
      MathConstants.IntMinValue,
      MathConstants.IntMaxValue
    );

    this.optionsFormGroup.setValue({
      country: this.optionsFormGroup.value.country ?? null,
      errors: this.optionsFormGroup.value.errors ?? null,
      seed: seed,
    });
  }

  private getData() {
    this.page += 1;
    const data: PersonalData[] = this.dataSource
      ? [...this.dataSource.data, ...TEMP_DATA]
      : TEMP_DATA;
    this.dataSource = new MatTableDataSource(data);
  }
}
