export enum Direction {
  ASC = "asc",
  DESC = "desc",
}

export function isDirection(value: Direction): boolean {
  return Object.values(Direction).includes(value)
}
