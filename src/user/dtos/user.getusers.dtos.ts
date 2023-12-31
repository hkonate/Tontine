import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class GetUsersReturnDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  pseudo: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  rating: number;
}
