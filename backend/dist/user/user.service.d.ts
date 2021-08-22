import { UserEntity } from 'src/entities/user';
import { LoginUserInput, SignUpUserInput, UserI } from 'src/models';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<UserEntity>);
    create(input: SignUpUserInput): Promise<UserI>;
    login(input: LoginUserInput): Promise<UserI>;
    findAll(options: IPaginationOptions): Promise<Pagination<UserI>>;
}
