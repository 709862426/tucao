import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/loginOrUpdateUser')
  async loginOrUpdateUser(@Body() body: any) {
    const { code, userInfo, phoneData } = body;

    if (!code || !phoneData || !phoneData.encryptedData || !phoneData.iv) {
      return { success: false, message: '参数不完整' };
    }

    return await this.userService.loginOrUpdateUser(code, userInfo, phoneData);
  }
}
