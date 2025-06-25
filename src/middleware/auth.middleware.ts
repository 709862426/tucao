import { Middleware, IMiddleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const token = ctx.get('Authorization')?.replace('Bearer ', '');

      if (!token) {
        ctx.status = 401;
        ctx.body = { success: false, message: '未提供 token' };
        return;
      }

      try {
        const decoded = Buffer.from(token, 'base64').toString();
        const [openid] = decoded.split('|');
        if (!openid) throw new Error('无效 token');

        ctx.user = { openid };

        const result = await next();
        return result;
      } catch (err) {
        ctx.status = 401;
        ctx.body = { success: false, message: 'token 无效' };
      }
    };
  }

  // 默认匹配所有路径，排除部分白名单接口
  match(ctx: Context): boolean {
    const whiteList = ['/user/loginOrUpdateUser'];
    return !whiteList.some(path => ctx.path.startsWith(path));
  }

  static getName(): string {
    return 'auth';
  }
}
