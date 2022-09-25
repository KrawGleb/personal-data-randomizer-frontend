import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { tap } from 'rxjs';
import { HttpConstants } from '../models/constants/http.constants';
import { PersonalData } from '../models/personal-data.model';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(private readonly httpClient: HttpClient) {}

  public exportData(data: PersonalData[]) {
    this.httpClient
      .post(HttpConstants.BaseApiUrl + '/csv', data, {
        responseType: 'text',
      })
      .pipe(tap((response) => this.downloadFile(response, 'text/csv;charset=utf-8')))
      .subscribe();
  }

  private downloadFile(data: any, type: string) {
    const blob = new Blob([data], { type: type });
    saveAs(blob, 'data.csv');
  }
}
