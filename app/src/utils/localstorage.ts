import type { Task } from "../types/Task"

export function parseJSON(value: string) {
  return value === "undefined" ? undefined : JSON.parse(value)
}

export function saveDataToLocalStorage(
  title: string,
  tasks?: Task[],
  points?: number,
  items?: string[]
) {
  if (points) {
    window.localStorage.setItem(title, JSON.stringify(points))
  } else if (tasks) {
    window.localStorage.setItem(title, JSON.stringify(tasks))
  } else if (items) {
    window.localStorage.setItem(title, JSON.stringify(items))
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
