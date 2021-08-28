import { UserEntity } from 'src/entities/user';
import { LoginUserInput, SignUpUserInput, UserI } from 'src/models';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { AuthService } from 'src/auth/services/auth.service';
export declare class UserService {
    private readonly userRepo;
    private authService;
    constructor(userRepo: Repository<UserEntity>, authService: AuthService);
    create(input: SignUpUserInput): Promise<UserI>;
    login(input: LoginUserInput): Promise<string>;
    findAll(options: IPaginationOptions): Promise<Pagination<UserI>>;
    findOne(id: number): Promise<UserI>;
}
