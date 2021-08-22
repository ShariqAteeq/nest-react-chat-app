import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user';
import { LoginUserInput, SignUpUserInput, UserI } from 'src/models';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(input: SignUpUserInput): Promise<UserI> {
    const { email, password, username } = input;

    const existingUser = await this.userRepo.findOne({ email });

    if (existingUser) {
      throw new HttpException(
        'User with this email already exist!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: UserEntity = new UserEntity();

    user.password = await bcrypt.hash(password, 10);
    user.username = username;
    user.email = email;

    let resp = await this.userRepo.save(user);

    return resp;
  }

  async login(input: LoginUserInput): Promise<UserI> {
    const { email, password } = input;

    const user = await this.userRepo.findOne(
      { email },
      { select: ['email', 'password', 'id', 'username'] },
    );

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      throw new HttpException('Invalid Password', HttpStatus.NOT_FOUND);
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<UserI>> {
    return await paginate<UserEntity>(this.userRepo, options);
  }
}
