import { Inject, Controller, Query, Post, Get, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { FormatMiddleware } from '../../middleware/format.middleware';
import { LoginService } from './login.service';
import { CaptchaService } from '@midwayjs/captcha';
import { captchaDTO, phoneDTO } from './dto/login';

const SMSClient = require('@alicloud/sms-sdk');

@Controller('/login', { middleware: [FormatMiddleware] })
export class LoginController {
  @Inject()
  ctx: Context;

  @Inject()
  loginService: LoginService;

  @Inject()
  captchaService: CaptchaService;

  @Get('/getImageCaptcha')
  async getImageCaptcha() {
    const { id, imageBase64 } = await this.captchaService.image({ width: 120, height: 40 });
    return {
      id,          // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    }
  }

  @Get('/getFormulaCaptcha')
  async getFormulaCaptcha() {
    const { id, imageBase64 } = await this.captchaService.formula({ noise: 1 });
    return {
      id,          // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    }
  }

  // 验证验证码是否正确
  @Post('/checkCaptcha')
  async getCaptcha(@Body() captcha: captchaDTO) {
    const passed: boolean = await this.captchaService.check(captcha.id, captcha.answer);
    if (passed) {
      return 'passed';
    }
    return 'error';
  }

  // 示例：短信验证码
  @Post('/smsCode')
  async sendSMSCode(@Body() phone: phoneDTO) {
    const { id, text: code } = await this.captchaService.text({ size: 4 });
    await SMSClient(phone, code);
    return { id }
  }


  /**
   * 登录
   * @param uid
   * @returns
   */
  @Post('/login')
  async login(@Query('uid') uid) {
    const user = await this.loginService.login({ uid });
    return user;
  }

  /**
   * 注册
   * @param uid
   * @returns
   */
  @Post('/register')
  async register(@Query('uid') uid) {
    const user = await this.loginService.register();
    return user;
  }

  /**
   * 获取验证码
   * @param uid
   * @returns
   */
  @Post('/getVerificationCode')
  async getVerificationCode(@Query('uid') uid) {
    const user = await this.loginService.getVerificationCode();
    return user;
  }

}
