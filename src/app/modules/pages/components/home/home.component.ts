import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public errorsCount: number = 0;
  public selectedCountry: string = 'ru';
  public countries: string[] = ['ru', 'us', 'pl'];

  constructor() {}

  ngOnInit(): void {}
}
