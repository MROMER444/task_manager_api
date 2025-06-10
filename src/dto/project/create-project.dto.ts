import { IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator";

export class CreateProjectDTO {
    @IsNotEmpty()
    @IsString()
    name : string;

    @IsOptional()
    @IsString()
    description? : string;

    // @IsNotEmpty()
    // @IsInt()
    // user_id : number;
}