import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateuserDTO } from '../dto/user/create-user.dto';
import { LoginUserDTO } from '../dto/user/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Body() loginDto : LoginUserDTO){
    return this.authService.login(loginDto.username , loginDto.password);
  }

  @Post('register')
  async register(@Body() createUserDto : CreateuserDTO){
    const newUser = await this.authService.usersService.createUser(createUserDto);
    return { message: 'User created', userId: newUser.id };
  }
  
}
