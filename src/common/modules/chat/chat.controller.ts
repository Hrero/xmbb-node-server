import { Controller, Get, Inject } from '@midwayjs/core';
import { Role } from '../../decorator/role.decorator';
import { IContext } from '../../../interface';
import { FormatMiddleware } from '../../middleware/format.middleware';
import { ReportMiddleware } from '../../middleware/report.middleware';
import { UserService } from '../user/user.service';

@Controller('/chat', {middleware: [FormatMiddleware, ReportMiddleware]})
export class ChatController {
  @Inject()
  userService: UserService;

  @Inject()
  ctx: IContext;

  @Role(['admin'])
  @Get('/1')
  async home(): Promise<any> {
    console.log(this.ctx, 44);
    console.log(this.ctx.user, 55);
    const uid = 1;
    const user = await this.userService.getUser({uid});
    return user;
  }
}
