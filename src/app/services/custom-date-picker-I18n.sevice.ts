import { Injectable } from "@angular/core"
import { NgbDatepickerI18n } from "@ng-bootstrap/ng-bootstrap"

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  private i18nConfig = {
    weekdays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    months: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    weekLabel: "Sem",
  }
  getMonthShortName(month: number): string {
    // NgbDatepicker months are 1-based
    return this.i18nConfig.months[month - 1].substring(0, 3) // Abreviação
  }

  getMonthFullName(month: number): string {
    return this.i18nConfig.months[month - 1]
  }

  getDayAriaLabel(date: { year: number; month: number; day: number }): string {
    return `${date.day}-${date.month}-${date.year}`
  }

  override getWeekdayLabel(
    weekday: number,
    width?: Exclude<Intl.DateTimeFormatOptions["weekday"], undefined>
  ): string {
    return this.i18nConfig.weekdays[weekday - 1]
  }
}
