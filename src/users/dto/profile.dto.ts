import {IsString, IsNotEmpty} from "class-validator";

export class ProfileDto {

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  
  @IsString()
  @IsNotEmpty()
  email: string;

}