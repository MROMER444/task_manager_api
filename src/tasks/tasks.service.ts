import { Injectable, InternalServerErrorException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { db } from '../database/db';

@Injectable()
export class TasksService {
    async createTask(createTaskDto: CreateTaskDto, userId: number) {
        try {
            const [task] = await db
                .insertInto('tasks')
                .values({
                    title: createTaskDto.title,
                    description: createTaskDto.description,
                    status: createTaskDto.status ?? 'pending',
                    due_date: createTaskDto.due_date,
                    user_id: userId,
                    project_id: createTaskDto.project_id
                })
                .returningAll()
                .execute();

            if (!task) {
                throw new InternalServerErrorException('Task creation failed unexpectedly');
            } else {
                return task;
            }
        } catch (error) {
            throw new InternalServerErrorException('Failed to create task');
        }
    }

    async getAllTasks(userId: number) {
        try {
            const tasks = await db
                .selectFrom('tasks')
                .selectAll()
                .where('user_id', '=', userId)
                .execute();

            if (!tasks) {
                throw new InternalServerErrorException('Failed to fetch task')
            } else {
                return tasks;
            }
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch task due to Internal erver Error Exception');
        }
    }

    async getTaskById(id: number, userId: number) {
        try {
            const task = await db.selectFrom('tasks').selectAll().where('id', '=', id).executeTakeFirst();
            if (!task) {
                throw new NotFoundException('Task not found');
            }
            if (task.user_id != userId) {
                throw new ForbiddenException('Access denied');
            }

            return task;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ForbiddenException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to fetch task');
        }
    }


    async updateTask(updateTaskDto: UpdateTaskDto, userId: number, id: number) {
        try {
            const existing = await this.getTaskById(id, userId);
            if (!existing) {
                throw new NotFoundException(`Task with id ${id} not found`);
            }

            const [updated] = await db.updateTable('tasks').set({
                title: updateTaskDto.title ?? existing.title,
                description: updateTaskDto.description ?? existing.description,
                status: updateTaskDto.status ?? existing.status,
                due_date: updateTaskDto.due_date ?? existing.due_date,
                project_id: updateTaskDto.project_id ?? existing.project_id,
            })
                .where('id', '=', id)
                .returningAll()
                .execute();

            if (!updated) {
                throw new NotFoundException(`Failed to update task with id ${id}`);
            }

            return updated;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to update the task');
        }
    }


    async deleteTask(id: number, userId: number) {
        try {
            const task = await this.getTaskById(id, userId);

            if (!task) {
                throw new NotFoundException(`Task with id ${id} not found`);
            }

            await db.deleteFrom('tasks').where('id', '=', id).execute();
            return { message: 'Task deleted successfully' };

        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ForbiddenException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to delete task');
        }
    }
}
