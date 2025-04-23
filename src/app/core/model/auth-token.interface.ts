export interface AuthTokenInterface {
  /** @returns the json web token (JWT) */
  access_token: string
  /** @returns the seconds of life of this `access_token`. Need to be LESS than `refresh_expires_in` */
  expires_in: number

  /** @returns the seconds of life of this `refresh_token`. Need to be GREATHER than `expires_in` */
  refresh_expires_in: number
  /** @returns the token value used to refresh/renew the `access_token`, if used before expires the seconds of `refresh_expires_in` */
  refresh_token: string

  token_type: string
  notBeforePolicy: number
  session_state: string
  scope: string
}
