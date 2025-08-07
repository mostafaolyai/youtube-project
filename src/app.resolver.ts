import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NotificationService } from './services/notification.service';
import { User } from './database/entities/user.entity';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly appService: AppService,
  ) {}

  @Query(() => Boolean)
  hello(@Args('id') id: string): boolean {
    this.notificationService.sendNotification(id, 'Hi');

    return true;
  }

  @Mutation(() => User)
  async addUser(
    @Args('email') email: string,
    @Args('totalPrice') totalPrice: string,
  ): Promise<User> {
    return this.appService.addUser(email, totalPrice);
  }
}
