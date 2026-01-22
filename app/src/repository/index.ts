import type ITaskRepository from "./interface/ITaskRepository"
import LocalStorageRepository from "./repositories/LocalStorageRepository"

const useDevMode = true

export const taskRepository: ITaskRepository = useDevMode
  ? new LocalStorageRepository()
  : console.log("new SupabaseRepository()")
