import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class SignUpDTO {
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

  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message: 'password must be a valid',
    },
  )
  password: string;
}

export class SignUpParamsDTO extends SignUpDTO {}

export class SignUpReturnDTO {}
