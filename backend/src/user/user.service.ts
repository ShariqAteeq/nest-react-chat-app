import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user';
import {
  LoginUserInput,
  SignUpUserInput,
  UpdateUserInput,
  UserI,
} from 'src/models';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async create(input: SignUpUserInput): Promise<UserI> {
    const { email, password, username } = input;

    const existingUser = await this.userRepo.findOne({ email });

    if (existingUser) {
      throw new HttpException('User with this email already exist!', 400);
    }

    const user: UserEntity = new UserEntity();

    user.password = await bcrypt.hash(password, 10);
    user.username = username;
    user.email = email;

    let resp = await this.userRepo.save(user);

    return resp;
  }

  async login(input: LoginUserInput): Promise<string> {
    const { email, password } = input;

    const user = await this.userRepo.findOne(
      { email },
      { select: ['email', 'password', 'id', 'username'] },
    );

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.authService.generateJWT(user);
    } else {
      throw new HttpException('Invalid Password', HttpStatus.NOT_FOUND);
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<UserI>> {
    return await paginate<UserEntity>(this.userRepo, options);
  }

  async findOne(id: number): Promise<UserI> {
    const user = await this.userRepo.findOne({ id });
    if (user) {
      return user;
    } else {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
  }

  async findAllByUsername(username: String): Promise<UserI[]> {
    console.log(username);
    return this.userRepo.find({
      where: {
        username: Like(`%${username}%`),
      },
    });
  }

  async updateUser(id: number, user: UpdateUserInput): Promise<UserI> {
    const userData = await this.userRepo.findOne({ id });

    if (!userData) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    userData.username = user.username;
    userData.aboutMe = user.aboutMe;

    await this.userRepo.save(userData);

    return userData;
  }
}
