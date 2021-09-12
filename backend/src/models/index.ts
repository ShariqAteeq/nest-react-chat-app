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
  image?: string;
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
  type?: ROOMTYPE;
  description?: string;
  users?: UserI[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class ConnectedUserI {
  id?: number;
  socketId?: string;
  user?: UserI;
}

export class UpdateUserInput {
  image?: string;
  username?: string;
  aboutMe?: string;
}

export enum ROOMTYPE {
  PRIVATE = 'PRIVATE',
  GROUP = 'GROUP',
}
