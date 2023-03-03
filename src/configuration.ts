import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { DefaultErrorFilter } from './common/filter/default.filter';
import { NotFoundFilter } from './common/filter/notfound.filter';
import * as typegoose from '@midwayjs/typegoose';
import * as jwt from '@midwayjs/jwt';
import * as security from '@midwayjs/security';
import * as passport from '@midwayjs/passport';
import * as captcha from '@midwayjs/captcha';
import { AllGuard } from './common/guard/all.guard';
import { ValidateErrorFilter } from './common/filter/validate.filter';
// import { JwtMiddleware } from './middleware/jwt.middleware';
import * as crossDomain from '@midwayjs/cross-domain';
import { InternalServerErrorFilter } from './common/filter/internal.filter';

@Configuration({
  imports: [
    koa,
    validate,
    typegoose,
    jwt,
    security,
    passport,
    crossDomain,
    captcha,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // this.app.useMiddleware([JwtMiddleware]);
    this.app.useFilter([NotFoundFilter, ValidateErrorFilter, InternalServerErrorFilter, DefaultErrorFilter]);
    this.app.useGuard([AllGuard])
  }
}
