import { MidwayConfig } from '@midwayjs/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import { User } from '../common/modules/login/entities/login';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1677334473312_8721',
  koa: {
    globalPrefix: '/xmbb',
    port: 5001,
    contextLoggerFormat: info => {
      const ctx = info.ctx;
      return `${info.timestamp} ${info.LEVEL} ${info.pid} [${ctx.userId} - ${Date.now() - ctx.startTime}ms ${ctx.method}] ${info.message}`;
    }
  },
  validate: {
    validationOptions: {
      allowUnknown: true, // 允许未定义的字段全局生效
      stripUnknown: true, // 剔除参数中的未定义属性
    },
  },
  bodyParser: {
    enable: false,
    enableTypes: ['json', 'form', 'text', 'xml'],
    formLimit: '1mb',
    jsonLimit: '1mb',
    textLimit: '1mb',
    xmlLimit: '1mb',
  },
  cors: {
    credentials: false,
  },
  mongoose: {
    dataSource: {
      default: {
        uri: 'mongodb://localhost:27017/xiaomatest',
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
  security: {
    csrf: {
      enable: true,
      type: 'ctoken',
      useSession: false,
      cookieName: 'csrfToken',
      sessionName: 'csrfToken',
      headerName: 'x-csrf-token',
      bodyName: '_csrf',
      queryName: '_csrf',
      refererWhiteList: [],
    },
    xframe: {
      enable: true,
      value: 'SAMEORIGIN',
    },
    csp: {
      enable: false,
    },
    hsts: {
      enable: false,
      maxAge: 365 * 24 * 3600,
      includeSubdomains: false,
    },
    noopen: {
      enable: false,
    },
    nosniff: {
      enable: false,
    },
    xssProtection: {
      enable: true,
      value: '1; mode=block',
    },
  },
  siteFile: {
    enable: false,
    favicon: readFileSync(join(__dirname, '../static/fav.ico')),
  },
} as MidwayConfig;
