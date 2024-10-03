import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogs } from './model/blogs';
const httpOptions1 = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "",
  }),
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'http://localhost:8080/api/v1.0/blogsite/user'; 
  constructor(private http: HttpClient) { }

  register(name: string, password: string,emailId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { name, password ,emailId },httpOptions1);
  }

  public getAllBlogs(): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(`${this.apiUrl}/blogs/getall`);
  }

  addBlogs(data: any , param: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = new HttpParams().set('name', param);
    return this.http.post(`${this.apiUrl}/blogs/add?`, JSON.stringify(data), { params,headers });
  }

  updateBlogs(data: any , param: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    //const params = new HttpParams().set('id', param);
    return this.http.put(`${this.apiUrl}/blogs/${ param }`, JSON.stringify(data), { headers });
  }

  deleteBlogs(param: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Explicitly set Content-Type
    });
    const params = new HttpParams().set('name', param);
    return this.http.delete(`${this.apiUrl}/blogs/delete?`,{ params,headers });
  }
}
