export interface EventModel {
  id: number
  title: string
  description: string
  startDateTime: string | null
  startTime: string
  endDateTime: string | null
  endTime: string
  timeZone: string
  location: string
  minutesNotification: number
  importance: number
  type: string
}
