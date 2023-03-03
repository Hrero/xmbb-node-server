import { Inject, Provide } from '@midwayjs/core';
import { IContext, IUserOptions } from '../../../interface';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../login/entities/login';
import { UserException, UserExceptionCode } from './UserException';

@Provide()
export class UserService {

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @Inject()
  ctx: IContext;

  async login(params) {
    return null
  }

  async getUser(options: IUserOptions) {
    const { _id: id } = await this.userModel.create({ name: 'JohnDoe', jobs: ['Cleaner'] } as User);
    const user = await this.userModel.findById(id).exec();
    console.log(this.ctx.user, ';ctx===');
    throw new UserException(UserExceptionCode.USERNAME_ERR);
    return user
  }
  async getUserById(id) {
    const user = await this.userModel.findById(id);
    return user;
  }
}
