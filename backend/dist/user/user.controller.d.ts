import { LoginUserInput, SignUpUserInput, UserI } from 'src/models';
import { UserService } from './user.service';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signUp(sinUpUserInput: SignUpUserInput): Promise<UserI>;
    login(input: LoginUserInput): Promise<UserI>;
    findAll(page?: number, limit?: number): Promise<Pagination<UserI>>;
}
