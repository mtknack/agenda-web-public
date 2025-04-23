import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import {
  PaginationInterface,
  toPageable,
} from "../core/shared/model/interface/pagination.interface"
import { EventModel } from "../model/dto/event.model"

@Injectable({
  providedIn: "root",
})
export class AgendaStoreService {
  private apiUrl = "http://localhost:8080/task"

  constructor(private http: HttpClient) {}

  sendData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data)
  }

  update(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, data)
  }
  listEvents(filter: any, pagination: PaginationInterface): Observable<any> {
    const sortParam = toPageable(pagination)

    return this.http.post<any>(`${this.apiUrl}/events?${sortParam}`, filter)
  }

  findById(id: number): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.apiUrl}/find-by-id/${id}`)
  }
}
