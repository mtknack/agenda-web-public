import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { Direction } from "../shared/model/enum/direction.enum"
import {
  PaginationBuilder,
  PaginationInterface,
} from "../shared/model/interface/pagination.interface"

@Injectable({
  providedIn: "root",
})
export class PaginationService {
  private _pagination$ = new BehaviorSubject<PaginationInterface>(
    PaginationBuilder()
  )

  get sort$() {
    return this._pagination$.asObservable()
  }

  get sort(): PaginationInterface {
    return this._pagination$.value
  }

  setSort(sort: PaginationInterface) {
    this._pagination$.next(sort)
  }

  sorted(field: string) {
    const current = this._pagination$.value

    if (field === current.field) {
      if (current.direction === null) {
        current.direction = Direction.ASC
      } else if (current.direction === Direction.ASC) {
        current.direction = Direction.DESC
      } else {
        current.direction = null
      }
    } else {
      const newSort = PaginationBuilder()
      newSort.direction = Direction.ASC
      newSort.field = field
      this._pagination$.next(newSort)
      return
    }

    this._pagination$.next({ ...current })
  }
}
