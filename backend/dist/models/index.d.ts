export declare class SignUpUserInput {
    username: string;
    email: string;
    password: string;
}
export declare class LoginUserInput {
    email: string;
    password: string;
}
export declare class UserI {
    id?: number;
    username?: string;
    email: string;
    password?: string;
}
export declare class LoginResponse {
    access_token: string;
    type: string;
    expires: number;
}
export declare class ErrorResponse {
    status: number;
    message: string;
}