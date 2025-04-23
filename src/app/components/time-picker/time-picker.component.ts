import { Component, ElementRef, forwardRef, ViewChild } from "@angular/core"
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import { faClock } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: "app-time-picker",
  templateUrl: "./time-picker.component.html",
  styleUrls: ["./time-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements ControlValueAccessor {
  @ViewChild("timeInput") timeInput!: ElementRef<HTMLInputElement>

  faClock = faClock
  value: string = ""
  disabled = false
  onChange: (value: string) => void = () => {}
  onTouched: () => void = () => {}
  writeValue(value: string): void {
    this.value = value
    if (this.timeInput) {
      this.timeInput.nativeElement.value = value
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
    if (this.timeInput) {
      this.timeInput.nativeElement.disabled = isDisabled
    }
  }

  openTimePicker(): void {
    if (this.timeInput) {
      this.timeInput.nativeElement.showPicker()
    }
  }

  onTimeChange(event: Event): void {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.onChange(this.value)
    this.onTouched()
  }
}
