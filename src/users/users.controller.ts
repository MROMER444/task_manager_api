import { Controller, Get , Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



   @Get('allUsers')
    async getAllUsers(){
      const users =  await this.usersService.getAllUsers();
      if(!users){
        return { message: 'User not found' };
      }
      else{
        return users;
      }
    }


    @Get(':username')
    async getUserByUsername(@Param('username') username : string){
      const user = await this.usersService.findByUsername(username);
      if(!user){
        return { message: 'User not found' };
      }
      return {id : user.id , username : user.username , email : user.email};
    }
  
}