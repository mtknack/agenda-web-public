import { Component, forwardRef, Input } from "@angular/core"
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import {
  NgbCalendar,
  NgbDate,
  NgbDatepickerI18n,
  NgbInputDatepicker,
} from "@ng-bootstrap/ng-bootstrap"
import moment from "moment"
import { CustomDatepickerI18n } from "../../services/custom-date-picker-I18n.sevice"

@Component({
  selector: "app-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    // { provide: NgbDateAdapter, useClass: CustomAdapter },
    // { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class DatePickerComponent
  extends NgbInputDatepicker
  implements ControlValueAccessor
{
  _date: NgbDate = new NgbDate(0, 0, 0)
  _dateVisible: string = ""
  @Input() id!: string
  @Input() required!: boolean
  @Input() placeholder: string = "dd/mm/aaaa"
  faCalendar = faCalendar

  private onChange: (value: any) => void = () => {}
  private onTouched: () => void = () => {}

  get date(): NgbDate {
    return this._date
  }

  set date(value: NgbDate) {
    this._date = value
    this._dateVisible = this.convertDate()
    this.onChange(value)
    this.onTouched()
  }

  constructor(private readonly calendar: NgbCalendar) {
    super()
  }

  override writeValue(value: any): void {
    if (value) {
      this._date = value
      this._dateVisible = this.convertDate()
    } else {
      this._date = new NgbDate(0, 0, 0)
      this._dateVisible = ""
    }
  }

  override registerOnChange(fn: any): void {
    this.onChange = fn
  }

  override registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  clear() {
    this.date = new NgbDate(0, 0, 0)
    this._dateVisible = ""
    this.onChange(null)
    this.onTouched()
  }

  today() {
    this.date = this.calendar.getToday()
  }

  formatDate() {
    if (!this.date) this._date = new NgbDate(0, 0, 0)

    const day = +this._dateVisible.slice(0, 2)
    const month = +this._dateVisible.slice(2, 4)
    const year = +this._dateVisible.slice(4, 8)

    this.date = new NgbDate(year, month, day)
  }

  convertDate(): string {
    const day = this.date.day > 9 ? this.date.day : "0" + this.date.day
    const month = this.date.month > 9 ? this.date.month : "0" + this.date.month
    const year = this.date.year

    if (this.date && this.isValidDate(+day, +month, year)) {
      return `${day}${month}${year}`
    }

    return ""
  }

  isValidDate(day: number, month: number, year: number): boolean {
    return moment({ year, month: month - 1, day }).isValid()
  }
}
