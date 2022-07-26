import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environment } from "./../env";
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  env:Environment;
  constructor(private http: HttpClient) {
    this.env = new Environment();
  }

  saveDetails(data: any): Observable<any> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
    };
    return this.http.post<string>(
      this.env.url + '/AddTradeDetails/',
      data,
      httpOptions
    );
  }
  updateDetails(data: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
    };
    return this.http.post<string>(
      this.env.url + '/UpdateTradeDetails/',
      data,
      httpOptions
    );
  }
  public getDetails(pageNumber: number, pageSize: number): Observable<any[]> {
    return this.http.get<any[]>(
      this.env.url +
        '/GetDetails?pageNumber=' +
        pageNumber +
        '&pageSize=' +
        pageSize
    );
  }
  public downloadFile(pdfFile: string): Observable<Blob> {
    return this.http.get(this.env.url + '/GetFile?pdfFile=' + pdfFile, {
      responseType: 'blob',
    });
  }

  getAll(): any {
    return this.http.get<any>(this.env.tradeLevelUrl);
  }

  public delete(ID: any) {
    return this.http.delete<any>(this.env.url + '/Delete?ID=' + ID);
  }
}
