import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "datePipe",
})
export class DatePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return ""

    // format "YYYY-MM-DDTHH:mm:ss"
    const datePart = value.split("T")[0]

    if (!datePart) return ""

    const [year, month, day] = datePart.split("-")

    return `${day}-${month}-${year}`
  }
}
