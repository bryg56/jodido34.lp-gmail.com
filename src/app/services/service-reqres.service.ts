import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceReqresService {
  private urlGlobal='https://reqres.in/api'
  constructor(private http:HttpClient) { 
  }
  public registerUser(data){
    let url=`${this.urlGlobal}/register`;
    console.log(data);
    return this.http.post(url,data);
  }
  public logingUser(data){
    let url='https://reqres.in/api/login'
    return this.http.post(url,data);
  }
  public getUsers(){
    let url='https://reqres.in/api/users?per_page=12';
    return this.http.get(url);
  }
  public updateUsers(id,data){
    let url=`https://reqres.in/api/users/${id}`
    
    return this.http.put(url,data);
    // return null;
  }
  public addUser(data){
    let url=`https://reqres.in/api/users`;
    return this.http.post(url,data);

  }
}
