import { Component, Input } from "@angular/core"
import {
  IconDefinition,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons"
import { Direction } from "../../core/shared/model/enum/direction.enum"
import { PaginationInterface } from "../../core/shared/model/interface/pagination.interface"

@Component({
  selector: "app-sort-icon",
  templateUrl: "./sort-icon.component.html",
  styleUrls: ["./sort-icon.component.scss"],
})
export class SortIconComponent {
  @Input() currentKey!: string
  @Input() pagination!: PaginationInterface

  faSort: IconDefinition = faSort
  faSortUp: IconDefinition = faSortUp
  faSortDown: IconDefinition = faSortDown

  get iconToShow(): IconDefinition {
    if (this.pagination.field !== this.currentKey) return this.faSort
    return this.pagination.direction == null
      ? faSort
      : this.pagination.direction === Direction.ASC
      ? this.faSortUp
      : this.faSortDown
  }
}
