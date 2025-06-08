import { ConflictException, Injectable } from '@nestjs/common';
import { db } from '../database/db';
import * as bcrypt from 'bcrypt';
import { CreateuserDTO } from '../dto/user/create-user.dto';

@Injectable()
export class UsersService {
    async findByUsername(username : string){
        return await db.selectFrom('users').selectAll().where('username' , '=' , username).executeTakeFirst();
    }


    async createUser(createUserDto : CreateuserDTO){
        const { username , password , email } = createUserDto;
        const existingUser = await db.selectFrom('users').select(['email']).where('email' , '=' , email).executeTakeFirst();
        if(existingUser){
            throw new ConflictException('user already exists')
        }
        else{
        const hashedPassword = await bcrypt.hash(password , 10);
        const [user] = await db.insertInto('users').values({ username , email , password : hashedPassword }).returningAll().execute();
        return user;
        }
    }

    async getAllUsers(){
        const users = await db.selectFrom('users').selectAll().execute();
        return users;
    }
}