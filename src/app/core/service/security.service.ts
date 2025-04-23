import { Injectable, OnInit } from "@angular/core"
import * as CryptoJS from "crypto-js"
import { LocalStorageService } from "ngx-webstorage"

@Injectable({ providedIn: "root" })
export class SecurityService implements OnInit {
  private readonly secretKey = "vB9x7ZqKw4DpF18AeMfC3sLtYuHVgPiJqNOeazEr"

  constructor(private storage: LocalStorageService) {}

  ngOnInit(): void {
    this.storage
      .observe("key")
      .subscribe((value) => console.log("new value", value))
  }

  /** Stores and encrypts a value in localStorage */
  encryptAndStore<T>(identifier: string, content: T): void {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(content),
      this.secretKey
    ).toString()
    this.storage.store(identifier, encrypted)
  }

  /** Retrieves and decrypts a stored value */
  retrieveAndDecrypt<T>(identifier: string): T {
    const stored = this.storage.retrieve(identifier) as string
    let parsed: any | null = null

    if (stored) {
      const decryptedBytes = CryptoJS.AES.decrypt(stored, this.secretKey)
      parsed = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))
    }

    return parsed
  }

  /** Deletes specific entries from localStorage */
  deleteKeys(...identifiers: string[]): void {
    identifiers.forEach((id) => this.storage.clear(id))
  }

  /** Completely clears all locally stored data */
  purgeAll(): void {
    this.storage.clear()
  }
}
