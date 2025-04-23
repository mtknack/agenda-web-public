export enum PageAction {
  EDIT = 0,
  CREATE = 1,
  VIEW = 2,
}

export function isPageAction(value: number): boolean {
  return Object.values(PageAction).includes(value)
}
