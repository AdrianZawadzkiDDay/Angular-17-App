import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {RegisterUser, User} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

const API_URL = `${environment.BASE_URL}/api/v1/auth/`

@Injectable({
  providedIn: 'root'
})
export class ActivationService {

    constructor(private http: HttpClient) {
    }

    activation(token: string): Observable<any> {
        let url = API_URL + 'activate/' + token;
        return this.http.post(url, {});
    }

}