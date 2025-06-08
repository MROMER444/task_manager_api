import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';


import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports : [
    PassportModule,
    JwtModule.register({
      secret : process.env.JWT_SECRET || 'super-secret-key',
      signOptions : {expiresIn : '1H'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy , UsersService],
  exports : [AuthService],
})
export class AuthModule {}
