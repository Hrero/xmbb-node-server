import { MidwayHttpError } from "@midwayjs/core";

export const BasicExceptionCode = {
  BASIC_PARAM_COUNT: { code: 10001, msg: '参数数量错误' },
  BASIC_PARAM_TYPE: { code: 10002, msg: '参数类型错误' },
  BASIC_PARAM_NULL: { code: 10003, msg: '参数为空' },
  BASIC_UNKNOWN_ERROR: { code: 99999, msg: '未知错误' },
  BASIC_SYSTEM_ERROR: { code: 10086, msg: '系统错误' }
}
export class BasicException extends MidwayHttpError {
  protected map: Map<string, string>;
  public code: string = '';
  protected msg: string | undefined = '';

  constructor(code: number = BasicExceptionCode.BASIC_UNKNOWN_ERROR.code, msg) {
    super(
      `${msg}_${code}`,
      200,
    );
  }

  public getCode() {
    return this.code;
  }

  public getMsg() {
    return this.msg;
  }

  public getMap() {
    return this.map;
  }

  public toString() {
    return `code:${this.code},msg:${this.msg}`;
  }
}
