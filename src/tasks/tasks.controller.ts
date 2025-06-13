import { Controller , Post , Get , Patch , Delete , Param , Body , ParseIntPipe , UseGuards , Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dto/task/create-task.dto'
import { UpdateTaskDto } from '../dto/task/update-task.dto'
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}


  @Post()
  async createTask(@Body() createTaskDto : CreateTaskDto , @Req() req){
    const userId = req.user.userId;
    return await this.tasksService.createTask(createTaskDto , userId);
  }

  @Get()
  async getAllTasks(@Req() req){
    const userId = req.user.userId;
    return await this.tasksService.getAllTasks(userId);
  }

  @Get(':id')
  async getTaskById(@Param('id' , ParseIntPipe) id : number , @Req() req){
    const userId = req.user.userId;
    return await this.tasksService.getTaskById(id , userId);
  }

  @Patch(':id')
  async updateTask(@Body() updateTaskDto : UpdateTaskDto , @Param('id' , ParseIntPipe) id : number , @Req() req ){
    const userId = req.user.userId;
    return await this.tasksService.updateTask(updateTaskDto , userId , id);
  }

  @Delete(':id')
  async deleteTask(@Param('id' , ParseIntPipe) id : number , @Req() req){
    const userId = req.user.userId;
    return await this.tasksService.deleteTask(id , userId)
  }

}
