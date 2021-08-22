import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginUserInput, SignUpUserInput, UserI } from 'src/models';
import { UserService } from './user.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async signUp(@Body() sinUpUserInput: SignUpUserInput): Promise<UserI> {
    return await this.userService.create(sinUpUserInput);
  }

  @Post('login')
  async login(@Body() input: LoginUserInput): Promise<UserI> {
    return await this.userService.login(input);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Pagination<UserI>> {
    limit = limit > 100 ? 100 : limit;
    return await this.userService.findAll({
      page,
      limit,
      //   route: 'http://localhost:3000/api/user',
    });
  }
}
