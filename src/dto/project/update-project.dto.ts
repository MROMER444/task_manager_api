import { IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator";

export class UpdateProjectDto {
    @IsNotEmpty()
    @IsString()
    name : string;

    @IsOptional()
    @IsString()
    description? : string;
}