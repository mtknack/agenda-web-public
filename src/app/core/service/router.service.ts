import { Injectable } from "@angular/core"
import { ActivatedRoute, Params, Router } from "@angular/router"
import { Observable } from "rxjs"
import { Md5 } from "ts-md5"
import { addDays } from "../util/date.util"
import { cloneDeep } from "../util/value.util"
import { AlertService } from "./alert.service"
import { StorageService } from "./storage.service"

export const LOGIN_PATH = "/login"

@Injectable({ providedIn: "root" })
export class RouterService {
  private stateParams: any

  constructor(
    private route: ActivatedRoute,
    private navigator: Router,
    private cache: StorageService,
    private alertService: AlertService
  ) {
    this.purgeExpiredViews()
  }

  navigate<T>(
    url: string,
    navigateInfo?: NavigationPayload<T>
  ): Promise<boolean> {
    const { params = {}, queryParams = {} } = navigateInfo || {}
    this.storeViewData<T>(url, params, queryParams)

    // TODO: Reevaluate the implementation in the future.

    // return new Promise((resolve) => {
    //   this.notificationService.showAlertConfirm({
    //     callbackConfirmFn: async () => {
    //       const result = await this.navigateTo(url, queryParams);
    //       resolve(result);
    //     },
    //     message: "All data will be lost, do you want to continue?",
    //     title: "Warning!",
    //   });
    // });

    return new Promise((resolve) => {
      resolve(this.redirect(url, queryParams))
    })
  }

  goToInNewTab<T>(path: string, nav?: NavigationPayload<T>): void {
    const { params = {}, queryParams = {} } = nav || {}
    this.storeViewData(path, params, queryParams)
    window.open(`${path}?vid=${queryParams["vid"]}`)
  }

  private storeViewData<T>(
    route: string,
    params: ViewParams<T>,
    query: Params
  ) {
    this.stateParams = params
    this.ensureVID(query)
    const vid = query["vid"]

    this.setCurrentView({ vid, route })
    this.setViewHistory(vid, {
      d: new Date(),
      obj: {
        vid,
        route: route,
        params: { ...this.stateParams },
        queryParams: query,
      },
    })
  }

  private ensureVID(query: Params) {
    if (!query["vid"]) {
      query["vid"] = Md5.hashStr(Math.random().toString()) as string
    }
  }

  private redirect(path: string, query?: Params): Promise<boolean> {
    return this.navigator.navigate([path], { queryParams: query })
  }

  observeRoute<T>(): Observable<ViewHistory<T>> {
    return new Observable((obs) => {
      this.route.queryParams.subscribe((query: Params) => {
        const data: ViewHistory<T> = {
          vid: (query as any).vid || "",
          route: this.navigator.url.split("?")[0] || "",
          params: { ...this.stateParams },
          queryParams: cloneDeep(query),
        }
        obs.next(data)
        obs.complete()
      })
    })
  }

  get url(): string {
    return this.navigator.url
  }

  isLogin(path?: string) {
    return [LOGIN_PATH].includes(path ?? this.url)
  }

  getHistoryByIndex(index: number): ViewStorage | null {
    const vid = this.cache.getHistory()?.at(-1 - index)
    return vid ? this.cache.fetchViewData(vid) : null
  }

  setCurrentView<T>(data: NavigationInfo<T>) {
    if (!this.isLogin(data.route)) {
      this.cache.saveLastPage(data)
    }
  }

  getViewHistory(vid: string): ViewStorage {
    return this.cache.fetchViewData(vid)
  }

  setViewHistory(vid: string, data: ViewStorage) {
    this.cache.saveViewData(vid, data)
  }

  purgeExpiredViews(): void {
    const expire = addDays(-7)
    const latest = this.getHistoryByIndex(0)

    if (!latest || new Date(latest.d) < expire) {
      this.cache.wipe()
    } else {
      const expired: string[] = []
      for (const vid of this.cache.getHistory()) {
        const entry = this.cache.fetchViewData(vid)
        if (!entry || new Date(entry.d) < expire) {
          this.cache.deleteKeys(vid)
          expired.push(vid)
        }
      }
      this.cache.removeFromHistory(...expired)
    }
  }
}

export interface NavigationInfo<T> {
  vid: string
  route: string
}

export interface NavigationPayload<T> {
  params: ViewParams<T>
  queryParams?: Params
}

export interface ViewHistory<T> {
  vid: string
  route: string
  params: ViewParams<T>
  queryParams?: Params
}

export interface ViewParams<T> {
  objCopy?: string
  p?: T
  [key: string]: any
}

export interface ViewStorage {
  d: Date
  obj: ViewHistory<any>
}
