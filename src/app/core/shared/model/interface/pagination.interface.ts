import { Direction } from "../enum/direction.enum"

export interface PaginationInterface {
  field: string | null
  direction: Direction | null
  page: number
  size: number
}

export function PaginationBuilder(): PaginationInterface {
  return {
    field: null,
    direction: null,
    page: 0,
    size: 10,
  }
}

export function toPageable(pagination: PaginationInterface): any {
  var params = `page=${pagination.page}&size=${pagination.size}`

  if (pagination?.direction && pagination?.field) {
    params = params + `&sort=${pagination.field},${pagination.direction}`
  }

  return params
}
