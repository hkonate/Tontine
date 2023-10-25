import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
  email: string;

  @IsString()
  @IsNotEmpty()
  rating: number;
}
