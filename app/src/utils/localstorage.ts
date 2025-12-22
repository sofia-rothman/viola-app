import type { Task } from "../types/Task"

export function parseJSON(value: string) {
  return value === "undefined" ? undefined : JSON.parse(value)
}

export function saveDataToLocalStorage(
  title: string,
  tasks?: Task[],
  XPpoints?: number
) {
  if (XPpoints) {
    window.localStorage.setItem(title, JSON.stringify(XPpoints))
  } else if (tasks) {
    window.localStorage.setItem(title, JSON.stringify(tasks))
  }
}

export function getDataFromLocalStorage(title: string) {
  const storedItemsJson = window.localStorage.getItem(title)
  const storedItems = storedItemsJson && parseJSON(storedItemsJson)

  if (storedItems && storedItems != undefined) {
    return storedItems
  }
  return null
}
