import { MidwayConfig } from '@midwayjs/core';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1750726624605_3882',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'postgres',
        host: '116.204.111.77',
        port: 5432,
        username: 'szkj',
        password: '123456',
        database: 'chengdu',
        synchronize: false,
        logging: false,
        entities: ['entity', '**/*.entity.{j,t}s'],
      },
    },
  },
  upload: {
    mode: 'file',
    whitelist: ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    fileSize: '10mb',
  },
  staticFile: {
    dirs: {
      public: {
        prefix: '/public',
        dir: 'public',
      },
    },
  },
} as MidwayConfig;
