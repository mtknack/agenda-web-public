import { Component } from "@angular/core"
import {
  faAdjust,
  faCalendarDay,
  faCheck,
  faForward,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: "app-vertical-menu",
  templateUrl: "./vertical-menu.component.html",
  styleUrl: "./vertical-menu.component.scss",
})
export class VerticalMenuComponent {
  faCheck = faCheck
  faForward = faForward
  faCalendarDay = faCalendarDay
  faAdjust = faAdjust
  faPlus = faPlus
}
