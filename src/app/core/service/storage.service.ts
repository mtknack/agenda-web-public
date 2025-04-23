import { Injectable } from "@angular/core"
import { Md5 } from "ts-md5"
import { NavigationInfo, ViewStorage } from "../service/router.service"
import { SecurityService } from "./security.service"

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private readonly authKey: string
  private readonly pageKey: string
  private readonly historyKey: string

  constructor(private storageService: SecurityService) {
    this.authKey = Md5.hashStr("__secure_token").toString()
    this.pageKey = Md5.hashStr("__last_page").toString()
    this.historyKey = Md5.hashStr("__page_history").toString()
  }

  /** Retrieves the last visited page stored */
  fetchLastPage<T>(): NavigationInfo<T> {
    return this.storageService.retrieveAndDecrypt(this.pageKey)
  }

  /** Sets the last accessed page in storage */
  saveLastPage<T>(page: NavigationInfo<T>): void {
    this.storageService.encryptAndStore(this.pageKey, page)
  }

  /** Retrieves route data for a specific view by VID */
  fetchViewData(vid: string): ViewStorage {
    return this.storageService.retrieveAndDecrypt(vid) as ViewStorage
  }

  /** Stores route data associated with a VID */
  saveViewData(vid: string, params: ViewStorage): void {
    this.appendToHistory(vid)
    this.storageService.encryptAndStore(vid, params)
  }

  /** Retrieves the history of stored VIDs */
  getHistory(): string[] {
    return this.storageService.retrieveAndDecrypt(this.historyKey) || []
  }

  /** Adds a new VID to the history, avoiding consecutive duplicates */
  appendToHistory(vid: string): void {
    const history = this.getHistory()
    const lastEntry = history[history.length - 1]

    if (vid !== lastEntry) {
      history.push(vid)
      this.storageService.encryptAndStore(this.historyKey, history)
    }
  }

  /** Removes specific entries from the VID history */
  removeFromHistory(...vids: string[]): void {
    const current = this.getHistory()
    if (vids.length) {
      const filtered = current.filter((v) => !vids.includes(v))
      if (current !== filtered) {
        this.storageService.encryptAndStore(this.historyKey, filtered)
      }
    }
  }

  /** Removes specific values from storage */
  deleteKeys(...keys: string[]): void {
    this.storageService.deleteKeys(...keys)
  }

  /** Completely clears the secure storage */
  wipe(): void {
    this.storageService.purgeAll()
  }
}
