import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { UserLocalStorage } from "../model/dto/user-local-store"

@Injectable({
  providedIn: "root",
})
export class LoginStoreService {
  private apiUrl = "http://localhost:8080/login"

  constructor(private http: HttpClient) {}

  login(userInfo: UserLocalStorage): Observable<UserLocalStorage[]> {
    return this.http.post<UserLocalStorage[]>(this.apiUrl, userInfo)
  }
}
