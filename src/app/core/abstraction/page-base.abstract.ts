import { Directive, HostListener, OnDestroy, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import {
  NavigationPayload,
  RouterService,
  ViewHistory,
} from "../service/router.service"
// import { MenuService } from "../services/menu.service"
import { hasAnyProps } from "../util/value.util"
import { PageActionBaseAbstract } from "./page-action-base.abstract"

@Directive()
export abstract class PageBaseAbstract
  extends PageActionBaseAbstract
  implements OnInit, OnDestroy
{
  private savedState: string = ""
  // TO DO: Rever dps nescessidade
  // menu: MenuService
  protected routeContext: ViewHistory<any> = {
    vid: "",
    route: "",
    params: {},
  }

  constructor(protected router: RouterService) {
    super()
    // TO DO: Rever dps nescessidade
    // this.menu = inject(MenuService)
  }

  @HostListener("window:beforeunload", ["$event"])
  handleUnload() {
    this.persistState()
  }

  ngOnDestroy(): void {
    this.persistState()
  }

  ngOnInit(): void {
    this.initVID()
  }

  protected abstract onComponentInit(): void
  protected abstract saveState(): any
  protected abstract restoreState(params: RestoreStateParams<any>): void
  protected abstract fetchParams(params: any, queryParams?: any): void

  protected storeSnapshot(obj: any): void {
    this.savedState = JSON.stringify(obj)
  }

  protected hasChanges(obj: any): boolean {
    return this.savedState !== JSON.stringify(obj)
  }

  private initComponent(): Observable<void> {
    return new Observable((observer) => {
      observer.next(this.onComponentInit())
      observer.complete()
    })
  }

  private initVID(): void {
    this.router.observeRoute().subscribe({
      next: (info: ViewHistory<any>) => (this.routeContext = info),
      complete: () => {
        if (!this.routeContext.vid) {
          this.requestVID()
        } else {
          this.beginWithVID()
        }
      },
    })
  }

  private requestVID(): void {
    const navigationParams: NavigationPayload<any> = {
      params: this.routeContext.params,
      queryParams: this.routeContext.queryParams,
    }
    const currentPath = this.router.url.split("?")[0]
    this.router
      .navigate(currentPath, navigationParams)
      .then(() => this.initVID())
      .catch((error) => {})
  }

  private beginWithVID(): void {
    this.initComponent().subscribe(() => {
      const persistedParams =
        this.router.getViewHistory(this.routeContext.vid)?.obj?.params || {}

      // TO DO: Rever dps nescessidade
      // this.menu.initializeStateByUrl(this.router.url)

      this.restoreState({
        ...persistedParams,
        hasParams: hasAnyProps(persistedParams),
      })

      if (!hasAnyProps(this.routeContext.params)) {
        this.routeContext.params = persistedParams
      }

      this.savedState = persistedParams.objCopy || ""
      this.fetchParams(this.routeContext.params, this.routeContext.queryParams)

      this.persistState()
      this.router.setCurrentView(this.routeContext)
    })
  }

  private persistState(): void {
    if (this.routeContext.vid) {
      const historyEntry: ViewHistory<any> = {
        ...this.routeContext,
        params: {
          ...this.saveState(),
          objCopy: this.savedState,
        },
        route: this.routeContext.route?.split("?")[0] || "",
      }
      this.router.setViewHistory(this.routeContext.vid, {
        d: new Date(),
        obj: historyEntry,
      })
    } else {
      // TO DO: verify console log
      console.log(
        "Awaiting VID generation for component",
        this.constructor.name
      )
      // logDebug()
    }
  }
}

export type RestoreStateParams<T> = {
  [K in keyof T]: any
} & {
  hasParams: boolean
}
