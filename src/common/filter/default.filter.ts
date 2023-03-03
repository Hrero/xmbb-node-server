import { Catch, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { BasicExceptionCode } from '../basic.exception';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 所有的未分类错误会到这里
    console.log(err instanceof MidwayHttpError, 'err1');
    const code = +err.message.split('_')[1]
    const msg = err.message.split('_')[0]
    if (err instanceof MidwayHttpError) {
      ctx.status = 200
      ctx.set({
        'Content-Type': 'application/json; charset=utf-8'
      });
      return {
        code,
        success: false,
        data: null,
        msg,
      };
    } else {
      ctx.status = 500
      ctx.set({
        'Content-Type': 'application/json; charset=utf-8'
      });
      return {
        code: BasicExceptionCode.BASIC_SYSTEM_ERROR,
        success: false,
        data: null,
        msg: err.message,
      };
    }
  }
}
