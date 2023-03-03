// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  firstName: string;

  @Rule(RuleType.string().max(10))
  lastName: string;

  @Rule(RuleType.number().max(60))
  age: number;
}

export class captchaDTO {
  @Rule(RuleType.string().required())
  id: any
  @Rule(RuleType.string().required())
  answer: any
}

export class phoneDTO {
  @Rule(RuleType.string().pattern(/^1[3456789]\d{9}$/).required())
  phone: string
}
