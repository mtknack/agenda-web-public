import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"
import { LocalStorageUtil } from "../../utils/local-storage-util"

@Injectable({
  providedIn: "root",
})
export class LoginRedirectGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = LocalStorageUtil.getUser()

    if (user) {
      this.router.navigate(["/list"])
      return false
    }

    return true
  }
}
