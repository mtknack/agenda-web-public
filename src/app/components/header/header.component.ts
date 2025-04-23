import { Component, OnDestroy, OnInit } from "@angular/core"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { LocalStorageUtil } from "../../utils/local-storage-util"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date()
  time: string = ""
  private intervalId: any

  faSignOutAlt = faSignOutAlt
  constructor() {}

  ngOnInit(): void {
    this.updateTime()
    this.intervalId = setInterval(() => this.updateTime(), 1000)
  }

  updateTime(): void {
    const now = new Date()
    this.time = now.toLocaleTimeString()
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId)
  }

  logout() {
    LocalStorageUtil.clearUser()
  }
}
