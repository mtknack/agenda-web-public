import { PlatformLocation } from "@angular/common"
import { inject, Injectable } from "@angular/core"
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons"
import Swal, { SweetAlertCustomClass, SweetAlertOptions } from "sweetalert2"

@Injectable({
  providedIn: "root",
})
export class AlertService {
  readonly #platform = inject(PlatformLocation)
  private readonly defaultModalWidth = 470

  constructor() {
    this.#platform.onPopState(() => Swal.close())
  }

  private baseSettings: SweetAlertOptions = {
    confirmButtonText: "Back",
    confirmButtonColor: "#00875C",
  }

  private styleClasses: SweetAlertCustomClass = {
    htmlContainer: "swal2-html-container--custom",
    confirmButton: "swal2-confirm-button--custom",
  }

  showAlertWarning({
    message,
    title,
    emptyTitle = false,
    timer,
    callbackFn,
  }: NotificationOptions): void {
    const config: SweetAlertOptions = {
      ...this.baseSettings,
      customClass: {
        ...this.styleClasses,
        title: "swal2-title--warning",
        icon: "swal2-icon",
      },
      width: this.defaultModalWidth,
      iconHtml: this.buildIconHTML(faTriangleExclamation),
      timer,
      timerProgressBar: !!timer,
      text: message,
      title: title || (emptyTitle ? "" : "Warning"),
    }

    this.executeAlert(config, {
      confirm: callbackFn,
      denied: callbackFn,
      dismissed: callbackFn,
    })
  }

  showAlertInfo({
    message,
    title,
    emptyTitle = false,
    timer,
    callbackFn,
  }: NotificationOptions): void {
    const config: SweetAlertOptions = {
      ...this.baseSettings,
      customClass: {
        ...this.styleClasses,
        title: "swal2-title--info",
        icon: "swal2-icon",
      },
      width: this.defaultModalWidth,
      iconHtml: this.buildIconHTML(faCircleInfo),
      timer,
      timerProgressBar: !!timer,
      text: message,
      title: title || (emptyTitle ? "" : "Information"),
    }

    this.executeAlert(config, {
      confirm: callbackFn,
      denied: callbackFn,
      dismissed: callbackFn,
    })
  }

  showAlertError({
    message,
    title,
    isHtml = false,
    emptyTitle = false,
    timer,
    callbackFn,
  }: NotificationOptions): void {
    const config: SweetAlertOptions = {
      ...this.baseSettings,
      customClass: {
        ...this.styleClasses,
        title: "swal2-title--error",
        icon: "swal2-icon",
        htmlContainer: isHtml ? "swal2-html-container--custom" : "",
      },
      width: this.defaultModalWidth,
      iconHtml: this.buildIconHTML(faCircleXmark),
      timer,
      timerProgressBar: !!timer,
      text: message,
      title: title || (emptyTitle ? "" : "Error"),
    }

    this.executeAlert(config, {
      confirm: callbackFn,
      denied: callbackFn,
      dismissed: callbackFn,
    })
  }

  showAlertSuccess({
    message,
    title,
    isHtml = false,
    emptyTitle = false,
    timer,
    callbackFn,
  }: NotificationOptions): void {
    const config: SweetAlertOptions = {
      ...this.baseSettings,
      customClass: {
        ...this.styleClasses,
        title: "swal2-title--success",
        icon: "swal2-icon",
        htmlContainer: isHtml ? "swal2-html-container--custom" : "",
      },
      width: this.defaultModalWidth,
      iconHtml: this.buildIconHTML(faCircleCheck),
      timer,
      timerProgressBar: !!timer,
      text: message,
      title: title || (emptyTitle ? "" : "Success"),
    }

    this.executeAlert(config, {
      confirm: callbackFn,
      denied: callbackFn,
      dismissed: callbackFn,
    })
  }

  showAlertConfirm({
    message,
    title,
    isHtml = false,
    emptyTitle = false,
    timer,
    callbackConfirmFn,
    callbackCancelFn,
  }: NotificationOptions): void {
    const config: SweetAlertOptions = {
      ...this.baseSettings,
      customClass: {
        ...this.styleClasses,
        title: "swal2-title--confirm",
        icon: "swal2-icon",
        htmlContainer: isHtml ? "swal2-html-container--custom" : "",
      },
      width: this.defaultModalWidth,
      iconHtml: this.buildIconHTML(faExclamation),
      iconColor: "#00875c",
      timer,
      timerProgressBar: !!timer,
      text: message,
      title: title || (emptyTitle ? "" : "Confirmation"),
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Confirm",
      reverseButtons: true,
    }

    this.executeAlert(config, {
      confirm: callbackConfirmFn,
      denied: callbackCancelFn,
      dismissed: callbackCancelFn,
    })
  }

  showCustomAlert(config: SweetAlertOptions): void {
    this.executeAlert(config)
  }

  private executeAlert(
    config: SweetAlertOptions,
    actions?: CallbackHandlers
  ): void {
    Swal.fire(config).then((result) => {
      if (!actions) return

      if (result.isConfirmed) {
        actions.returnedValue?.get?.(result.value)?.() ?? actions.confirm?.()
      } else if (result.isDenied) {
        actions.returnedValue?.get?.(result.value)?.() ?? actions.denied?.()
      } else if (result.isDismissed) {
        switch (result.dismiss) {
          case Swal.DismissReason.cancel:
            this.callFirstAvailable(actions.dismissedCancel, actions.dismissed)
            break
          case Swal.DismissReason.backdrop:
            this.callFirstAvailable(
              actions.dismissedBackdrop,
              actions.dismissed
            )
            break
          case Swal.DismissReason.close:
            this.callFirstAvailable(actions.dismissedClose, actions.dismissed)
            break
          case Swal.DismissReason.esc:
            this.callFirstAvailable(actions.dismissedEsc, actions.dismissed)
            break
          case Swal.DismissReason.timer:
            this.callFirstAvailable(actions.dismissedTimer, actions.dismissed)
            break
          default:
            this.callFirstAvailable(actions.dismissed)
        }
      }
    })
  }

  private callFirstAvailable(
    ...callbacks: Array<(() => void) | undefined>
  ): void {
    for (const cb of callbacks) {
      if (cb) {
        cb()
        break
      }
    }
  }

  private buildIconHTML(icon: any): string {
    return `<fa-icon [icon]="icon" class="fa-2x" style="color: #00875c;"></fa-icon>`
  }
}

export interface NotificationOptions {
  message: string
  title?: string
  timer?: number
  emptyTitle?: boolean
  isHtml?: boolean
  callbackFn?: () => void
  callbackConfirmFn?: () => void
  callbackCancelFn?: () => void
}

export interface CallbackHandlers {
  confirm?: () => void
  denied?: () => void
  returnedValue?: Map<any, any>
  dismissed?: () => void
  dismissedCancel?: () => void
  dismissedBackdrop?: () => void
  dismissedClose?: () => void
  dismissedEsc?: () => void
  dismissedTimer?: () => void
}
