import { BasicException, BasicExceptionCode } from "../../basic.exception";

export const UserExceptionCode = {
  USERNAME_ERR: { code: 10001, msg: '账号错误' },
  PASSWORD_ERR: { code: 10002, msg: '密码错误' },
}

export class LoginException extends BasicException {

  constructor(key) {
    const code = key && UserExceptionCode[key]?.code ? UserExceptionCode[key]?.code: BasicExceptionCode.BASIC_UNKNOWN_ERROR.code
    const msg = key && UserExceptionCode[key]?.code ? UserExceptionCode[key]?.msg: BasicExceptionCode.BASIC_UNKNOWN_ERROR.msg
    super(code, msg);
  }

}
