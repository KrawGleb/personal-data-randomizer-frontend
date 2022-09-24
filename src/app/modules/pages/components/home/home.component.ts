import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
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

  public dataSource!: MatTableDataSource<PersonalData>;
  public displayedColumns: string[] = [
    'index',
    'identifier',
    'fullName',
    'address',
    'phone',
  ];

  ngOnInit(): void {
    this.getData();
  }

  public handleScroll(scrolled: boolean) {
    scrolled ? this.getData() : _.noop();
  }

  private getData() {
    this.page += 1;
    console.log(this.page);
    const data: PersonalData[] = this.dataSource
      ? [...this.dataSource.data, ...TEMP_DATA]
      : TEMP_DATA;
    this.dataSource = new MatTableDataSource(data);
  }
}
