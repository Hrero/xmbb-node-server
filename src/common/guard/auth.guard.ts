import { getPropertyMetadata, Guard, httpError, IGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ROLE_META_KEY } from '../decorator/role.decorator';

@Guard()
export class AuthGuard implements IGuard<Context> {
  async canActivate(context: Context, supplierClz, methodName: string): Promise<boolean> {
    // ...
    context.setAttr('sue', 22)
    if (methodName ==='xxx') {
      throw new httpError.ForbiddenError();
    }
    console.log(ROLE_META_KEY, supplierClz, methodName, 'ROLE_META_KEY, supplierClz, methodName');
    const roleNameList = getPropertyMetadata<string[]>(ROLE_META_KEY, supplierClz, methodName);
    if (roleNameList && roleNameList.length && context.user.role) {
      // 假设中间件已经拿到了用户角色信息，保存到了 context.user.role 中
      // 直接判断是否包含该角色
      return roleNameList.includes(context.user.role);
    }

    return true
  }
}
