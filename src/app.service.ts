import { Injectable } from '@nestjs/common';
import { User } from './database/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BigNumber } from 'bignumber.js';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addUser(email: string, totalPrice: string): Promise<User> {
    const bn = new BigNumber(totalPrice);
    if (!BigNumber.isBigNumber(bn)) {
      throw new Error('Invalid totalPrice value');
    }

    const newPrice = bn.dividedBy(new BigNumber(3));
    const user = this.userRepository.create({
      email,
      totalPrice: newPrice.toFixed(0),
    });
    return this.userRepository.save(user);
  }
}
