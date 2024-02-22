import { Task } from "../../domain/models/Task";
import { TaskRepository } from "../../infraestructure/repositories/TaskRepository";

export class TaskService {
    constructor(private taskRepository: TaskRepository) {}

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.findAll();
    }

    async getTaskById(id: string): Promise<Task | null> {
        return await this.taskRepository.findById(id);
    }

    async createTask(title: string, description: string): Promise<Task> {
        const task = new Task(Date.now().toString(), title, description);
        return await this.taskRepository.save(task);
    }

    async updateTask(id: string, title: string, description: string, completed: boolean): Promise<Task> {
        let task = await this.taskRepository.findById(id);
        if (!task) throw new Error('Task not found');
        task.title = title;
        task.description = description;
        task.completed = completed;
        return await this.taskRepository.save(task);
    }

    async deleteTask(id: string): Promise<void> {
        return await this.taskRepository.delete(id);
    }
}
