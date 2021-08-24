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
