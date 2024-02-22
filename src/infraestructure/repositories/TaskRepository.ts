import { Task } from "../domain/models/Task";

export interface TaskRepository {
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    save(task: Task): Promise<Task>;
    delete(id: string): Promise<void>;
}
