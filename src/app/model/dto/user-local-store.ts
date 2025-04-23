export interface UserLocalStorage {
  id: number | null
  name: string
  password: string
  remember: boolean
  token: string | null
}

export function UserLocalStorageBuilder(): UserLocalStorage {
  return {
    id: null,
    name: "",
    password: "",
    remember: false,
    token: null,
  }
}
