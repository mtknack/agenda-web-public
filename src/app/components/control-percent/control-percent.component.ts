import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  NgZone,
  ViewChild,
} from "@angular/core"
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"

@Component({
  selector: "app-control-percent",
  templateUrl: "./control-percent.component.html",
  styleUrl: "./control-percent.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlPercentComponent),
      multi: true,
    },
  ],
})
export class ControlPercentComponent
  implements ControlValueAccessor, AfterViewInit
{
  @ViewChild("slider") slider!: ElementRef<HTMLInputElement>
  progressColor: string = "#5f8be9"

  constructor(private zone: NgZone) {}
  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        const event = new Event("input", { bubbles: true })
        this.slider.nativeElement.dispatchEvent(event)
      })
    })
  }
  updateVolume(event: Event): void {
    const target = event.target as HTMLInputElement
    this.value = String(target.value)
    const color = this.getColorByValue(Number(this.value))

    this.slider.nativeElement.style.setProperty("--progress-color", color)
  }

  private getColorByValue(value: number): string {
    if (value <= 20) return "#5f8be9"
    if (value <= 40) return "#65ed99"
    if (value <= 60) return "#edd157"
    if (value <= 80) return "#e97439"
    return "#e64a39"
  }

  value: string = "0"
  disabled = false
  onChange: (value: string) => void = () => {}
  onTouched: () => void = () => {}
  writeValue(value: string): void {
    this.value = value
    if (this.slider) {
      this.slider.nativeElement.value = value
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
    if (this.slider) {
      this.slider.nativeElement.disabled = isDisabled
    }
  }

  openTimePicker(): void {
    if (this.slider) {
      this.slider.nativeElement.showPicker()
    }
  }

  onTimeChange(event: Event): void {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.onChange(this.value)
    this.onTouched()
  }
}
