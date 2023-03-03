import { Inject, Controller, Get, Query, UseGuard, Body, Post } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { AuthGuard } from '../../guard/auth.guard';
import { IContext } from '../../../interface';
import { FormatMiddleware } from '../../middleware/format.middleware';
import { JwtPassportMiddleware } from '../../middleware/jwtpass.middleware';
// import { ReportMiddleware } from '../middleware/report.middleware';
import { UserService } from './user.service';

@Controller('/user', { middleware: [FormatMiddleware] })
export class UserController {
  @Inject()
  ctx: IContext;

  @Inject()
  jwt: JwtService;

  @Inject()
  userService: UserService;

  @UseGuard(AuthGuard)
  @Get('/getUser')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return user;
  }

  @Get('/user')
  async login(@Body('username') username: string, @Body('password') password: string) {
    const user = await this.userService.login({ username, password });
    this.ctx.session = { user };
    this.ctx.rotateCsrfSecret();
    return { success: true };
  }

  @Post('/passport/jwt', { middleware: [JwtPassportMiddleware] })
  async jwtPassport() {
    console.log('jwt user: ', this.ctx.state.user);
    return this.ctx.state.user;
  }

  @Post('/jwt')
  async genJwt() {
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
    };
  }
}
