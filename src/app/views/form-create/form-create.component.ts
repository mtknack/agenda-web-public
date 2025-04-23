import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import {
  faFloppyDisk,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
import { QuillModules } from "ngx-quill"
import Quill from "quill"
import { QuillEditorConfig } from "../../config/quill-editor.config"
import {
  PageBaseAbstract,
  RestoreStateParams,
} from "../../core/abstraction/page-base.abstract"
import { RouterService } from "../../core/service/router.service"
import { PageAction } from "../../core/shared/model/enum/page-action.enum"
import {
  combineDateTime,
  formatDateTimeForNgbDate,
  formatDateTimeForTime,
} from "../../core/util/date.util"
import { EventModel } from "../../model/dto/event.model"
import { getTypeEnumList } from "../../model/enums/type.enum"
import { SelectModel } from "../../model/model/select.model"
import { QuillService } from "../../services/quill.service"
import { AgendaStoreService } from "../../store/agenda-store.service"

@Component({
  selector: "app-form-create",
  templateUrl: "./form-create.component.html",
  styleUrl: "./form-create.component.scss",
})
export class FormCreateComponent extends PageBaseAbstract {
  taskId!: number
  form!: FormGroup
  eventModel!: EventModel
  typesSelect: SelectModel[] = getTypeEnumList()
  quillEditorConfigs!: Map<string, QuillEditorConfig>
  faPlus = faPlus
  faPenToSquare = faPenToSquare
  faFloppyDisk = faFloppyDisk

  constructor(
    private fb: FormBuilder,
    private store: AgendaStoreService,
    private quillService: QuillService,
    routerService: RouterService
  ) {
    super(routerService)
    this.formCreate()
    this.quillEditorConfigs = this.quillService.createConfigs(["description"])
  }

  protected override onComponentInit(): void {}
  protected override saveState(): SaveParams {
    return {
      form: this.form.getRawValue(),
      action: this.action,
      taskId: this.taskId,
    }
  }
  protected override restoreState(
    params: RestoreStateParams<SaveParams>
  ): void {
    if (!params.hasParams) return
    if (!!params.form) this.form.setValue(params.form)
    if (!!params.taskId) {
      this.taskId = params.taskId
      this.findById()
    }
  }
  protected override fetchParams(params: any, queryParams?: any): void {
    if (!params) return

    if (!!params.taskId) {
      this.taskId = params.taskId
      this.findById()
      this.form.disable()
    }

    if (!!params.action) this.action = params.action
  }

  formCreate() {
    this.form = this.fb.group({
      id: [null],
      title: ["", Validators.required],
      description: [""],
      startDate: ["", Validators.required],
      startTime: ["", Validators.required],
      endDate: ["", Validators.required],
      endTime: ["", Validators.required],
      location: [""],
      notifications: [10],
      type: [],
      importance: ["0"],
    })
  }

  getQuillFormats(name: string): string[] {
    return this.quillService.getFormats(this.quillEditorConfigs, name)
  }

  getQuillModules(name: string): QuillModules {
    return this.quillService.getModules(this.quillEditorConfigs, name)
  }

  setQuillEditor(editor: Quill, name: string) {
    this.quillService.setEditor(this.quillEditorConfigs, name, editor)
  }

  onSubmit() {
    this._normalizeDto()
    if (this.form.valid || this.form.get("title")?.value != "") {
      this.store.sendData(this.eventModel).subscribe(
        (response) => {
          console.log("Successfully submitted data:", response)
        },
        (error) => {
          console.error("Error submitting data:", error)
        }
      )
    }
  }

  onEdit() {}

  edit() {
    if (this.form.disabled) {
      this.form.enable()
    } else {
      this._normalizeDto()
      if (this.form.valid) {
        this.store.update(this.eventModel).subscribe(
          (response) => {
            console.log("Successfully submitted data:", response)
          },
          (error) => {
            console.error("Error submitting data:", error)
          }
        )
      }
    }
  }

  _normalizeDto() {
    this.eventModel = this.form.getRawValue()

    const startDate = this.form.get("startDate")?.value
    const endDate = this.form.get("endDate")?.value
    const startTime = this.form.get("startTime")?.value
    const endTime = this.form.get("endTime")?.value

    this.eventModel.timeZone = "UTC" // Change to the correct timezone received from the user

    this.eventModel.startDateTime = combineDateTime(startDate, startTime)
    this.eventModel.endDateTime = combineDateTime(endDate, endTime)
  }

  _normalizeForm(response: EventModel) {
    this.form.patchValue(response)
    this.form
      .get("startDate")
      ?.setValue(formatDateTimeForNgbDate(response.startDateTime!))
    this.form
      .get("endDate")
      ?.setValue(formatDateTimeForNgbDate(response.endDateTime!))
    this.form
      .get("startTime")
      ?.setValue(formatDateTimeForTime(response.startDateTime!))
    this.form
      .get("endTime")
      ?.setValue(formatDateTimeForTime(response.endDateTime!))

    console.log(this.form)
  }

  findById() {
    this.store.findById(this.taskId).subscribe(
      (response) => {
        this._normalizeForm(response)
      },
      (error) => {
        console.error("Error submitting data:", error)
      }
    )
  }
}

interface SaveParams {
  form: FormGroup
  action: PageAction
  taskId: number
}
