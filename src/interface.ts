import { Context } from "@midwayjs/core";

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface IContext extends Context {
  user: any;
  session: any
  rotateCsrfSecret: any
  state: any
}
