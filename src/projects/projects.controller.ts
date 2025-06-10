import { Body, Controller, Post , Req , Get , Param , ParseIntPipe, Patch, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from '../dto/project/create-project.dto';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
// import { GetUser } from '../auth/decorators/get-user.decorator';
// import { User } from 'src/database/db.types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}


  @Post()
  async createProject(@Body() createProjectDto : CreateProjectDTO , @Req() req){
    const userId = req.user.userId;
    const project = await this.projectsService.createProject(createProjectDto , userId);
    return project;
  }

  @Get()
  async getAllProjects(@Req() req){
    const userId = req.user.userId;
    const projects = await this.projectsService.getAllProjects(userId);
    return projects
  }

  @Get(':id')
  async getProjectById(@Param('id' , ParseIntPipe) id : number , @Req() req){
    const userId = req.user.userId;
    return this.projectsService.getProjectById(id , userId);
  }

  @Patch(':id')
  async updateProject(@Param('id' , ParseIntPipe) id : number , @Body() updateProjectDto : UpdateProjectDto , @Req() req){
    const userId = req.user.userId;
    return this.projectsService.updateProject(id , updateProjectDto , userId)
  }

  @Delete(':id')
  async deleteProject(@Param('id' , ParseIntPipe) id : number , @Req() req){
    const userId = req.user.userId;
    return this.projectsService.deleteProject(id , userId);
  }


}
