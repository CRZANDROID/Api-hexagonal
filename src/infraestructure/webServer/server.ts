

import express from 'express';
import { TaskService } from '../../application/services/TaskService';
import { TaskRepositoryMemory } from '../repositories/taskRepositoryMemory';

const app = express();
const port = 3000;

app.use(express.json());

const taskRepository = new TaskRepositoryMemory();
const taskService = new TaskService(taskRepository);

app.get('/tasks', async (req, res) => {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
});

app.get('/tasks/:id', async (req, res) => {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
});

app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    const task = await taskService.createTask(title, description);
    res.status(201).json(task);
});

app.put('/tasks/:id', async (req, res) => {
    const { title, description, completed } = req.body;
    const task = await taskService.updateTask(req.params.id, title, description, completed);
    res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
