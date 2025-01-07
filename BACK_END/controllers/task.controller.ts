import { Request, Response } from 'express';
import AppDataSource from '../config/database';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';

// Repository instances
const taskRepository = AppDataSource.getRepository(Task);
const userRepository = AppDataSource.getRepository(User);

// Create a new task
export const createTask = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { title, description, assigned_to, assigned_by, priority, due_date, client_id } = req.body;

        const salesman = await userRepository.findOneBy({ id: assigned_to });
        const manager = await userRepository.findOneBy({ id: assigned_by });

        if (!salesman || !manager) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const task = new Task();
        task.title = title;
        task.description = description;
        task.assigned_to = assigned_to;
        task.assigned_by = assigned_by;
        task.priority = priority;
        task.due_date = due_date;
        //task.client_id = client_id

        await taskRepository.save(task);
        res.status(201).json(task);
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
        return;
    }
};

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await taskRepository.find({ relations: ['assigned_to', 'assigned_by'] });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Get tasks for a specific user
export const getTasksByUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const numericId = parseInt(id, 10); // Convert the string ID to a number

        if (isNaN(numericId)) {
            res.status(400).json({ message: "Invalid user ID provided." });
            return;
        }

        const tasks = await taskRepository.find({
            where: [
                { assigned_to: { id: numericId } },
                { assigned_by: { id: numericId } }
            ],
            relations: ['assigned_to', 'assigned_by']
        });
        
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};



// Update task status
export const updateTaskStatus = async (req: Request, res: Response) => {
    try {
        const { task_id } = req.params;
        const { status } = req.body;

        const task = await taskRepository.findOneBy({ task_id });

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        task.status = status;
        if (status === 'Completed') {
            task.completed_at = new Date();
        }

        await taskRepository.save(task);
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { task_id } = req.params;
        const task = await taskRepository.findOneBy({ task_id });

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        await taskRepository.remove(task);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
