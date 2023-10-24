import { IsString, IsNotEmpty } from 'class-validator';

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}
