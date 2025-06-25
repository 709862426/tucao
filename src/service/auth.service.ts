// src/service/auth.service.ts
import { Provide } from '@midwayjs/core';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import axios from 'axios';

@Provide()
export class AuthService {
  @InjectEntityModel(User)
  userRepo: Repository<User>;

  async loginWithWeChatCode(code: string) {
    // 替换为你自己的 AppID 和 AppSecret
    const appid = 'wx980f4925988d47df';
    const secret = '717338da31b794ee6bf69beb8bcb5afb';

    // 调用微信接口换取 openid 和 session_key
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
    const response = await axios.get(url);
    const { openid } = response.data;

    if (!openid) {
      return { success: false, message: '登录失败', data: response.data };
    }

    let user = await this.userRepo.findOne({ where: { openid } });
    if (!user) {
      user = this.userRepo.create({ openid });
      await this.userRepo.save(user);
    }

    // 生成一个简单 token（示例）
    const token = Buffer.from(`${openid}|${Date.now()}`).toString('base64');

    return {
      success: true,
      data: {
        token,
        user,
      },
    };
  }
}
