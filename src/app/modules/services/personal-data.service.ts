import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConstants } from '../models/constants/http.constants';
import { PersonalData } from '../models/personal-data.model';
import { RandomOptions } from '../models/random-options.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalDataService {
  constructor(private readonly httpClient: HttpClient) {}

  public getData(options: RandomOptions, page: number) : Observable<PersonalData[]> {
    options.seed = +options.seed + page;

    return this.httpClient.post<PersonalData[]>(HttpConstants.BaseApiUrl + '/data', options);
  }
}
