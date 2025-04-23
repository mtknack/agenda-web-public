import { Component } from "@angular/core"

@Component({
  selector: "app-site-color",
  templateUrl: "./site-color.component.html",
  styleUrl: "./site-color.component.scss",
})
export class SiteColorComponent {
  colorSelected: string = ""

  toggleColorMode(event: Event) {
    document.documentElement.style.setProperty(
      "--primary-color",
      this.colorSelected
    )
  }
}
