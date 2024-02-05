import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "../../services/authentication.service";
import {Observable} from "rxjs";
const API_URL = `${environment.BASE_URL}/api/v1`

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  changePassword(password: string, newPassword: string, confirmPassword: string): Observable<any> {
    const token = this.authenticationService.currentUserValue.token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const changePasswordDTO = {
      currentPassword: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };
    return this.http.post<any>(API_URL + '/personal/changePassword', changePasswordDTO, { headers: headers })
  }

}
