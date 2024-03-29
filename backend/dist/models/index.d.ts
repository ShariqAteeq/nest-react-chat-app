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
    image?: string;
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
export declare class RoomI {
    id?: number;
    name?: string;
    type?: ROOMTYPE;
    description?: string;
    users?: UserI[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class ConnectedUserI {
    id?: number;
    socketId?: string;
    user?: UserI;
}
export declare class UpdateUserInput {
    image?: string;
    username?: string;
    aboutMe?: string;
}
export declare enum ROOMTYPE {
    PRIVATE = "PRIVATE",
    GROUP = "GROUP"
}
