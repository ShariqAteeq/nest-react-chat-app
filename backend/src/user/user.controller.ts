import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  LoginResponse,
  LoginUserInput,
  SignUpUserInput,
  UserI,
} from 'src/models';
import { UserService } from './user.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async signUp(@Body() sinUpUserInput: SignUpUserInput): Promise<UserI> {
    return await this.userService.create(sinUpUserInput);
  }

  @Post('login')
  async login(@Body() input: LoginUserInput): Promise<LoginResponse> {
    let token = await this.userService.login(input);
    const payload: LoginResponse = {
      access_token: token,
      type: 'JWT',
      expires: 10000,
    };

    return payload;
  }

  @UseGuards(JwtAuthGuard)
  @Get('all_user')
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

  @Get('/get_one/:id')
  async getUser(@Param('id') id: String): Promise<UserI> {
    return await this.userService.findOne(Number(id));
  }

  @Get('/find-by')
  async findAllByUsername(
    @Query('username') username: string,
  ): Promise<UserI[]> {
    console.log(username);
    return this.userService.findAllByUsername(username);
  }
}
