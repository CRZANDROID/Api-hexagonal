

import { Task } from "../../domain/models/Task";
import { TaskRepository } from "../../infraestructure/repositories/TaskRepository";

export class TaskRepositoryMemory implements TaskRepository {
    private tasks: Task[] = [];

    async findAll(): Promise<Task[]> {
        return this.tasks;
    }

    async findById(id: string): Promise<Task | null> {
        return this.tasks.find(task => task.id === id) || null;
    }

    async save(task: Task): Promise<Task> {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            this.tasks[index] = task;
        } else {
            this.tasks.push(task);
        }
        return task;
    }

    async delete(id: string): Promise<void> {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
}
