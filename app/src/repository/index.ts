import type ITaskRepository from "./interface/ITaskRepository"
import FirebaseTaskRepository from "./repositories/FirebaseRepository"
import LocalStorageRepository from "./repositories/LocalStorageRepository"

const useDevMode = false

export const taskRepository: ITaskRepository = useDevMode
  ? new LocalStorageRepository()
  : new FirebaseTaskRepository()
