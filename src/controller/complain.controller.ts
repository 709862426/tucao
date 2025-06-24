import { Controller, Inject, Post, Body } from '@midwayjs/core';
import { ComplainService } from '../service/complain.service';
import { Context } from '@midwayjs/koa';

@Controller('/complain')
export class ComplainController {
  @Inject()
  ctx: Context;

  @Inject()
  complainService: ComplainService;

  @Post('/create')
  async create(@Body() body: any) {
    const { content, hotel, images } = body;
    const { openid } = this.ctx.user;
    if (!content || content.length < 10) {
      return { success: false, message: '内容至少10字' };
    }
    const result = await this.complainService.submitComplain({
      openid,
      content,
      hotel,
      images,
    });
    return { success: true, data: result };
  }

  @Post('/getComplains')
  async getMyComplains() {
    const { openid } = this.ctx.user;
    const list = await this.complainService.getListByOpenid(openid);
    return { success: true, data: list };
  }
}
