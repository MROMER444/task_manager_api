import { IsEmail, IsEmpty, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class CreateuserDTO {
    @IsNotEmpty()
    @IsString()
    username : string;

    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @MinLength(6)
    password : string;
}