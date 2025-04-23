import { SelectModel } from "../model/select.model"

export enum TypeEnum {
  JOB = "Job",
  HOME = "Home",
  LEISURE = "Leisure",
  FACULTY = "Faculty",
}

export function getTypeEnumList(): SelectModel[] {
  return Object.entries(TypeEnum).map(([id, description]) => ({
    id,
    description,
  }))
}
