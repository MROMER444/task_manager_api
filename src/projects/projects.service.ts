import { Injectable, NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { db } from '../database/db';
import { CreateProjectDTO } from '../dto/project/create-project.dto';
import { UpdateProjectDto } from '../dto/project/update-project.dto';




@Injectable()
export class ProjectsService {
    async createProject(createProjectDto: CreateProjectDTO, userId: number) {
        try {
            const [project] = await db
                .insertInto('projects')
                .values({
                    name: createProjectDto.name,
                    description: createProjectDto.description,
                    user_id: userId,
                })
                .returningAll()
                .execute();
            return project;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create project');
        }
    }


    async getAllProjects(userId: number) {
        try {
            const projects = await db.selectFrom('projects').selectAll().where('user_id', '=', userId).execute();
            return projects
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch projects');
        }
    }


    async getProjectById(id: number, userId: number) {
        try {
            const project = await db
                .selectFrom('projects')
                .selectAll()
                .where('id', '=', id)
                .executeTakeFirst();

            if (!project) {
                throw new NotFoundException('Project not found');
            }

            if (project.user_id !== userId) {
                throw new ForbiddenException('Access denied');
            }

            return project;
        } catch (error) {
            console.error(`Error fetching project with ID ${id}:`, error);
            if (error instanceof NotFoundException || error instanceof ForbiddenException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to fetch project');
        }
    }

    async updateProject(id: number, updateProjectDto: UpdateProjectDto, userId: number) {
        try {
            const existing = await this.getProjectById(id, userId);
            if (!existing) {
                throw new NotFoundException(`Project with id ${id} not found`);
            }

            const [updated] = await db.updateTable('projects').set({
                name: updateProjectDto.name ?? existing.name,
                description: updateProjectDto.description ?? existing.description,
            })
                .where('id', '=', id)
                .returningAll()
                .execute();

            return updated;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update the project');
        }
    }


    async deleteProject(id: number, userId: number) {
        try {
            const project = await this.getProjectById(id, userId);

            if (!project) {
                throw new NotFoundException(`Project with id ${id} not found`);
            }

            await db.deleteFrom('projects').where('id', '=', id).execute();
            return { message: 'Project deleted successfully' };

        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ForbiddenException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to delete project');
        }
    }
}
