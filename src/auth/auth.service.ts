import { Injectable , UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        readonly usersService : UsersService,
        private readonly jwtService : JwtService
    ){}
    

    async login(username : string , password : string){
        const user = await this.usersService.findByUsername(username);
        if(!user || !(await bcrypt.compare(password , user.password))){
            throw new UnauthorizedException('Invalid username or password');
        }

        const payload = {id : user.id , username : user.username , email : user.email};
        return{
            access_token : this.jwtService.sign(payload),
        };
    }
}