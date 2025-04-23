import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { LoginComponent } from "./authentication/login/login.component"
import { SiteColorComponent } from "./components/site-color/site-color.component"
import { LoginRedirectGuardService } from "./core/guards/login-redirect-guard.service"
import { FormCreateComponent } from "./views/form-create/form-create.component"
import { ListEventsComponent } from "./views/list-events/list-events.component"

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [LoginRedirectGuardService],
  },
  { path: "list", component: ListEventsComponent },
  { path: "create", component: FormCreateComponent },
  { path: "personalize", component: SiteColorComponent },
  // { path: 'visualizar', component:  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
