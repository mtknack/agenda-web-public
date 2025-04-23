import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { LocalStorageUtil } from "../../utils/local-storage-util"

import { faPlus } from "@fortawesome/free-solid-svg-icons"
import {
  UserLocalStorage,
  UserLocalStorageBuilder,
} from "../../model/dto/user-local-store"
import { LoginStoreService } from "../../store/login-store.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  form!: FormGroup
  userInfo: UserLocalStorage = UserLocalStorageBuilder()
  faPlus = faPlus
  constructor(
    private fb: FormBuilder,
    private store: LoginStoreService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      password: ["", Validators.required],
      remember: [false, Validators.required],
    })
  }

  onSubmit() {
    this.userInfo = this.form.getRawValue()

    if (this.form.valid || this.form.get("title")?.value != "") {
      this.store.login(this.userInfo).subscribe(
        (response) => {
          if (this.userInfo.remember) {
            LocalStorageUtil.saveUser(this.userInfo)
            this.router.navigate(["/list"])
          }
        },
        (error) => {
          console.error("Erro ao enviar dados:", error)
        }
      )
    }
  }
}
