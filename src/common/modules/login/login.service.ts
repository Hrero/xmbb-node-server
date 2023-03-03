import { Inject, Provide } from '@midwayjs/core';
import { IContext } from '../../../interface';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from './entities/login';

@Provide()
export class LoginService {

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @Inject()
  ctx: IContext;

  async login(params) {
    return null
  }

  async register() {
    return null
  }

  async getVerificationCode() {
    return null
  }

}
