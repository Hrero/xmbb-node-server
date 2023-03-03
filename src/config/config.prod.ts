import { MidwayConfig } from '@midwayjs/core';
import { User } from '../common/modules/login/entities/login';

export default {
  keys: '1676387424280_235',
  koa: {
    globalPrefix: '/xmbb',
    port: 5001,
  },
  mongoose: {
    dataSource: {
      default: {
        uri: 'mongodb://121.196.178.118:27017/xiaomatest',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          user: 'benben',
          pass: 'Xmbb2023'
        },
        // 关联实体
        entities: [ User ]
      }
    }
  },
} as MidwayConfig;
