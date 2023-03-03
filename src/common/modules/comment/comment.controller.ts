import { Inject, Controller, Get, Query, UseGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AuthGuard } from '../../guard/auth.guard';
import { FormatMiddleware } from '../../middleware/format.middleware';
import { UserService } from '../user/user.service';

@Controller('/comment', { middleware: [FormatMiddleware] })
export class CommentController {
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
