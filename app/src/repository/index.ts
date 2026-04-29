import type ITaskRepository from "./interface/IRepository"
import FirebaseRepository from "./repositories/FirebaseRepository"
import LocalStorageRepository from "./repositories/LocalStorageRepository"

const useDevMode = false

/** Single repository instance used by hooks to keep storage selection in one place. */
export const taskRepository: ITaskRepository = useDevMode
  ? new LocalStorageRepository()
  : new FirebaseRepository()
