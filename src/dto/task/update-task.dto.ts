import { IsNotEmpty, IsOptional, IsString, IsDateString, IsInt , IsEnum } from 'class-validator';

enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}


export class UpdateTaskDto {
     @IsNotEmpty()
      @IsString()
      title: string;
    
      @IsOptional()
      @IsString()
      description?: string;
    
      @IsOptional()
      @IsEnum(TaskStatus , {message: 'Status must be one of: pending, in_progress, completed'})
      status?: TaskStatus;
    
      @IsOptional()
      @IsDateString()
      due_date?: string;
    
    //   @IsNotEmpty()
    //   @IsInt()
    //   user_id: number;
    
      @IsOptional()
      @IsInt()
      project_id?: number;

}