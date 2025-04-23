import { Component, OnInit } from "@angular/core"
import {
  faChevronDown,
  faEdit,
  faFilter,
} from "@fortawesome/free-solid-svg-icons"
import { PaginationService } from "../../core/service/pagination.service"
import { PageAction } from "../../core/shared/model/enum/page-action.enum"
import {
  PaginationBuilder,
  PaginationInterface,
} from "../../core/shared/model/interface/pagination.interface"
import { EventModel } from "../../model/dto/event.model"
import { getTypeEnumList } from "../../model/enums/type.enum"
import {
  TaskFilterBuilder,
  TaskFilterInterface,
} from "../../model/filter/task-filter.interface"
import { SelectModel } from "../../model/model/select.model"
import { AgendaStoreService } from "../../store/agenda-store.service"
import { RouterService } from "./../../core/service/router.service"

@Component({
  selector: "app-list-events",
  templateUrl: "./list-events.component.html",
  styleUrl: "./list-events.component.scss",
})
export class ListEventsComponent implements OnInit {
  currentDate: Date = new Date()
  expandedIndex: number | null = null
  itensSelected: number[] = []
  items!: EventModel[]
  pagination: PaginationInterface = PaginationBuilder()
  taskFilter: TaskFilterInterface = TaskFilterBuilder()
  typesSelect: SelectModel[] = getTypeEnumList()

  faFilter = faFilter
  faChevronDown = faChevronDown
  faEdit = faEdit

  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index
  }

  ngOnInit(): void {
    this.listEvents()
    this.paginationService.sort$.subscribe((pagination) => {
      this.pagination = pagination
    })
  }

  constructor(
    private store: AgendaStoreService,
    private routerService: RouterService,
    private paginationService: PaginationService
  ) {}

  listEvents() {
    this.store.listEvents(this.taskFilter, this.pagination).subscribe(
      (response) => {
        this.items = response.content
        console.log("Successfully submitted data:", response)
      },
      (error) => {
        console.error("Error submitting data:", error)
      }
    )
  }
  sorted(field: string): void {
    this.paginationService.sorted(field)
    this.listEvents()
  }

  rotate(index: number): string {
    if (index == this.expandedIndex) {
      return " open"
    }
    return ""
  }

  edit(index: number) {
    this.routerService.navigate("/create", {
      params: {
        action: PageAction.VIEW,
        taskId: index,
      },
    })
  }

  addTask(): void {
    // Logic to add a new task
  }

  completeTask(): void {
    // Logic to mark task as completed
  }

  rescheduleTask(): void {
    // Logic to reschedule the task
  }

  postponeTask(): void {
    // Logic to postpone the task to tomorrow
  }
}
