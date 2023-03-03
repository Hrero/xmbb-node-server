import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { UserService } from '../modules/user/user.service';
// import { UserService } from '../service/user.service';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const userService = await ctx.requestContext.getAsync<UserService>('userService');
      const user = await userService.getUserById('63ecebfecc8de8d8d73d7db2');
      await ctx.requestContext.setAttr('user', user)
      await ctx.setAttr('user', user)
      ctx.user = user
      console.log(ctx, 'iser');
      const startTime = Date.now();
      const result = await next();
      ctx.logger.info(
        `Report in "src/middleware/report.middleware.ts", rt = ${Date.now() - startTime
        }ms`
      );
      return result;
    };
  }

  ignore(ctx: Context): boolean {
    // 下面的路由将忽略此中间件
    return false
    // return ctx.path === '/'
    //   || ctx.path === '/api/auth'
    //   || ctx.path === '/api/login';
  }

  static getName(): string {
    return 'report';
  }
}
