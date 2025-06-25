import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Complain } from '../entity/complain';

@Provide()
export class ComplainService {
  @InjectEntityModel(Complain)
  complainRepo: Repository<Complain>;

  async submitComplain(data: {
    openid: string;
    content: string;
    hotel?: string;
    contact?: string;
    images?: string[];
  }) {
    const complain = this.complainRepo.create({
      ...data,
      images: JSON.stringify(data.images || []),
    });
    return this.complainRepo.save(complain);
  }

  async getListByOpenid(openid: string) {
    return this.complainRepo.find({
      where: { openid },
      order: { createdAt: 'DESC' },
    });
  }
}
