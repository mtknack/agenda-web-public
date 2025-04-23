import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "dateTimePipe",
})
export class TimePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return ""

    // format "YYYY-MM-DDTHH:mm:ss"
    const timePart = value.split("T")[1]

    if (timePart) {
      const [hours, minutes] = timePart.split(":")
      return `${hours}:${minutes}`
    }

    return ""
  }
}
