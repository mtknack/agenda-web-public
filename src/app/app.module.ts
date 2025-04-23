import { LOCALE_ID, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { CommonModule, registerLocaleData } from "@angular/common"
import { provideHttpClient } from "@angular/common/http"
import ptBr from "@angular/common/locales/pt"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
import { NgSelectModule } from "@ng-select/ng-select"
import { NgxMaskDirective, provideEnvironmentNgxMask } from "ngx-mask"
import { QuillModule } from "ngx-quill"
import {
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
  withSessionStorage,
} from "ngx-webstorage"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { LoginComponent } from "./authentication/login/login.component"
import { RegisterComponent } from "./authentication/register/register.component"
import { ControlPercentComponent } from "./components/control-percent/control-percent.component"
import { DatePickerComponent } from "./components/date-picker/date-picker.component"
import { HeaderComponent } from "./components/header/header.component"
import { SiteColorComponent } from "./components/site-color/site-color.component"
import { SortIconComponent } from "./components/sort-icon/sort-icon.component"
import { TimePickerComponent } from "./components/time-picker/time-picker.component"
import { VerticalMenuComponent } from "./components/vertical-menu/vertical-menu.component"
import { DatePipe } from "./pipes/date.pipe"
import { TimePipe } from "./pipes/time.pipe"
import { QuillService } from "./services/quill.service"
import { FormCreateComponent } from "./views/form-create/form-create.component"
import { ListEventsComponent } from "./views/list-events/list-events.component"

registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    ListEventsComponent,
    HeaderComponent,
    VerticalMenuComponent,
    FormCreateComponent,
    DatePickerComponent,
    TimePickerComponent,
    DatePipe,
    TimePipe,
    ControlPercentComponent,
    SiteColorComponent,
    LoginComponent,
    RegisterComponent,
    SortIconComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgxMaskDirective,
    QuillModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [
    provideHttpClient(),
    provideEnvironmentNgxMask(),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ":", caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage()
    ),
    QuillService,
    { provide: LOCALE_ID, useValue: "pt" },
  ],
  bootstrap: [AppComponent],
  exports: [DatePipe, TimePipe],
})
export class AppModule {}
