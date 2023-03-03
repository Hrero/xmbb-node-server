import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      if (result === null) {
        ctx.status = 200;
      }
      return {
        code: 200,
        msg: 'success',
        data: result,
      }
    };
  }

  match(ctx) {
    return ctx.path.indexOf('/api') !== -1;
  }
}
