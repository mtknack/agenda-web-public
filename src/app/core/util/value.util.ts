// Deeply clones an object via JSON
export function cloneDeep<T>(data: T): T {
  return <T>JSON.parse(JSON.stringify(data))
}

// Compares two objects or arrays by JSON string
export function isEqualJson(a: any, b: any): boolean {
  return a === b || JSON.stringify(a) === JSON.stringify(b)
}

// Compares two arrays ignoring order
export function areArraysEqual<T>(a: T[], b: T[]): boolean {
  return (
    (!a?.length && !b?.length) ||
    (a?.length === b?.length &&
      areArrays(a, b) &&
      a.every((el) => b.includes(el)))
  )
}

// Compares deeply objects and arrays recursively
export function isDeepEqual(a: any, b: any): boolean {
  return (
    a === b ||
    (!a && !b) ||
    (!a?.length && !b?.length) ||
    isEqualJson(a, b) ||
    areArraysEqual(a, b) ||
    (areObjects(a, b) &&
      hasAnyProps(a, b) &&
      propCount(a) === propCount(b) &&
      Object.keys(a).every((key) => isDeepEqual(a[key], b[key])))
  )
}

// Verifies if all arguments are arrays
export function areArrays(...args: any[]) {
  return args.every((arr) => arr instanceof Array)
}

// Verifies if all arguments are valid objects
export function areObjects(...args: any[]) {
  return args.every((obj) => typeof obj === "object" && exists(obj))
}

// Counts the properties of an object
export function propCount(obj: Object): number {
  return Object.keys(obj).length
}

// Verifies if all objects have properties
export function hasAnyProps(...objs: Object[]): boolean {
  return objs.every((obj) => Object.keys(obj).length > 0)
}

// Checks if a value is different from null and undefined
export function exists(val: any) {
  return val !== null && val !== undefined
}
