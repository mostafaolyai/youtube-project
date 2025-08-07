import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UserEntity')
@Entity()
export class User extends Base {
  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ type: 'numeric', precision: 30, scale: 2, default: '0.00' })
  totalPrice: string;
}
