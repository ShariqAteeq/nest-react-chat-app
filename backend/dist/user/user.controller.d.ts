import { LoginResponse, LoginUserInput, SignUpUserInput, UpdateUserInput, UserI } from 'src/models';
import { UserService } from './user.service';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signUp(sinUpUserInput: SignUpUserInput): Promise<UserI>;
    login(input: LoginUserInput): Promise<LoginResponse>;
    findAll(page?: number, limit?: number): Promise<Pagination<UserI>>;
    updateOne(id: number, user: UpdateUserInput): Promise<UserI>;
    getUser(id: String): Promise<UserI>;
    findAllByUsername(username: string): Promise<UserI[]>;
}
