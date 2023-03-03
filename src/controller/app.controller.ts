import { Inject, Controller, Get, Query, UseGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AuthGuard } from '../common/guard/auth.guard';
import { FormatMiddleware } from '../common/middleware/format.middleware';
import { UserService } from '../common/modules/user/user.service';

@Controller('/app', { middleware: [FormatMiddleware] })
export class AppController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @UseGuard(AuthGuard)
  @Get('/getUser')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return user;
  }
}
