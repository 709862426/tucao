// src/controller/auth.controller.ts
import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AuthService } from '../service/auth.service';

@Controller('/api')
export class AuthController {
  @Inject()
  ctx: Context;

  @Inject()
  authService: AuthService;

  @Post('/login')
  async login(@Body() body: { code: string }) {
    const { code } = body;
    const result = await this.authService.loginWithWeChatCode(code);
    return result;
  }
}
