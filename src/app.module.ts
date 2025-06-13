import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ProjectsModule, UsersModule, AuthModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
