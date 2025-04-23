export interface TaskFilterInterface {
  title: string | null
  type: string | null
}

export function TaskFilterBuilder(): TaskFilterInterface {
  return {
    title: null,
    type: null,
  }
}
