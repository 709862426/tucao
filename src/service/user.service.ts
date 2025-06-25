import { Provide } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { User } from '../entity/user';
import axios from 'axios';
import { decryptPhoneData } from '../utils/wxDecrypt';
import { InjectEntityModel } from '@midwayjs/typeorm';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepo: Repository<User>;
  private readonly appid = 'wx980f4925988d47df';
  private readonly secret = '717338da31b794ee6bf69beb8bcb5afb';

  // 根据 code 换取 openid 和 session_key
  async getSessionKey(code: string) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appid}&secret=${this.secret}&js_code=${code}&grant_type=authorization_code`;
    const res = await axios.get(url);
    if (res.data.openid && res.data.session_key) {
      return { openid: res.data.openid, sessionKey: res.data.session_key };
    }
    return null;
  }

  async loginOrUpdateUser(
    code: string,
    userInfo: any,
    phoneData: { encryptedData: string; iv: string }
  ) {
    const session = await this.getSessionKey(code);
    if (!session) {
      return { success: false, message: 'code无效或过期' };
    }

    const { openid, sessionKey } = session;

    // 解密手机号
    const phoneInfo = decryptPhoneData(
      sessionKey,
      phoneData.encryptedData,
      phoneData.iv
    );
    if (!phoneInfo || !phoneInfo.phoneNumber) {
      return { success: false, message: '手机号解密失败' };
    }

    // 查询用户
    let user = await this.userRepo.findOne({ where: { openid } });

    if (!user) {
      user = this.userRepo.create({
        openid,
        phoneNumber: phoneInfo.phoneNumber,
        nickname: userInfo?.nickName || '',
        avatarUrl: userInfo?.avatarUrl || '',
      });
    } else {
      // 更新手机号和用户信息
      user.phoneNumber = phoneInfo.phoneNumber;
      user.nickname = userInfo?.nickName || user.nickname;
      user.avatarUrl = userInfo?.avatarUrl || user.avatarUrl;
    }

    await this.userRepo.save(user);

    // 简单生成 token（生产环境请用JWT或其他安全方案）
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
