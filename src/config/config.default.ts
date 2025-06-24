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
        host: '192.168.1.7',
        port: 5432,
        username: 'postgres',
        password: 'szkj1234567890',
        database: 'chengdu',
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,
        entities: ['entity', '**/*.entity.{j,t}s'],
      },
    },
  },
} as MidwayConfig;
