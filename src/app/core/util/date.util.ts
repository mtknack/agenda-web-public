/**
 * Adds days to a given date. If no date is provided, the current date is used.
 *
 * @param days Number of days to add
 * @param baseDate Base date (optional)
 * @returns New date with the added days
 */
export function addDays(days: number, baseDate: Date = new Date()): Date {
  const result = new Date(baseDate)
  result.setDate(baseDate.getDate() + days)
  return result
}

/**
 * Combines an NgbDate and a time string into an ISO 8601 datetime string.
 *
 * @param date NgbDate object containing year, month, and day
 * @param time Time string in the format "HH:mm"
 * @returns Combined datetime string in the format "YYYY-MM-DDTHH:mm:ss" or null if invalid input
 */
export function combineDateTime(date: any, time: any): string | null {
  if (!date || !time) {
    return null
  }

  const year = date.year
  const month = String(date.month).padStart(2, "0")
  const day = String(date.day).padStart(2, "0")

  const [hour, minute] = time.split(":").map((num: any) => num.padStart(2, "0"))
  const second = "00"

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`
}

import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap"

/**
 * Converts a date string into an object compatible with NgbDateStruct.
 *
 * @param date ISO 8601 date string (e.g., "2025-04-15T14:30:00")
 * @returns Object with year, month, and day properties
 */
export function formatDateTimeForNgbDate(date: string): NgbDateStruct {
  const parsedDate = new Date(date)
  return {
    year: parsedDate.getFullYear(),
    month: parsedDate.getMonth() + 1,
    day: parsedDate.getDate(),
  }
}

/**
 * Converts a date string into a time string (HH:mm).
 *
 * @param date ISO 8601 date string (e.g., "2025-04-15T14:30:00")
 * @returns Time string in the format "HH:mm"
 */
export function formatDateTimeForTime(date: string): string {
  const parsedDate = new Date(date)
  const hours = String(parsedDate.getHours()).padStart(2, "0")
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0")
  return `${hours}:${minutes}`
}
