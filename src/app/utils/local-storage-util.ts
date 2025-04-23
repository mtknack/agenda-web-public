export class LocalStorageUtil {
  private static readonly USER_KEY = "user_data"

  static saveUser(data: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(data))
  }

  static getUser(): any {
    const json = localStorage.getItem(this.USER_KEY)
    return json ? JSON.parse(json) : null
  }

  static clearUser(): void {
    localStorage.removeItem(this.USER_KEY)
  }
}
