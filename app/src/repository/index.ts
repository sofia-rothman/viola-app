import type ITaskRepository from "./interface/IRepository"
import FirebaseRepository from "./repositories/FirebaseRepository"
import LocalStorageRepository from "./repositories/LocalStorageRepository"

const useDevMode = false

export const taskRepository: ITaskRepository = useDevMode
  ? new LocalStorageRepository()
  : new FirebaseRepository()
