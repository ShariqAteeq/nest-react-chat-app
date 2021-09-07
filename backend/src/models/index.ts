export class SignUpUserInput {
  username: string;
  email: string;
  password: string;
}

export class LoginUserInput {
  email: string;
  password: string;
}

export class UserI {
  id?: number;
  username?: string;
  email: string;
  password?: string;
}

export class LoginResponse {
  access_token: string;
  type: string;
  expires: number;
}

export class ErrorResponse {
  status: number;
  message: string;
}

export class RoomI {
  id?: number;
  name?: string;
  description?: string;
  users?: UserI[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class UpdateUserInput {
  username?: string;
  aboutMe?: string;
}
