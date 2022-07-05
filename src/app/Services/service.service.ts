import { Injectable } from '@angular/core';
import {  Observable  } from 'rxjs';  
import {  HttpClient,  HttpHeaders  } from '@angular/common/http';  
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = "http://localhost:51727/API/TradeDetails";
  tradeLevelUrl = '../assets/store.json';
  constructor(private http: HttpClient) { }
  
  saveDetails(data: any):Observable<any>{
    let headers = new HttpHeaders();  
        headers.append('Content-Type', 'application/json');  
        const httpOptions = {  
            headers: headers  
        };  
        return this.http.post < string > (this.url + '/AddTradeDetails/', data, httpOptions);
  }
  public getDetails(): Observable < any[] > {  
    return this.http.get < any[] > (this.url + '/GetDetails');  
  } 
  public downloadFile(pdfFile: string): Observable < Blob > {  
    return this.http.get(this.url + '/GetFile?pdfFile=' + pdfFile, {  
        responseType: 'blob'  
    });  
} 

  getAll():any{
    return this.http.get<any>(this.tradeLevelUrl);
  }

  public delete(ID:any){
    return this.http.delete<any>(this.url + '/Delete?ID=' + ID);
  }
}
