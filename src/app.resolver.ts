import { Resolver, Query, Args } from '@nestjs/graphql';
import { NotificationService } from './services/notification.service';

@Resolver()
export class AppResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => Boolean)
  hello(@Args('id') id: string): boolean {
    this.notificationService.sendNotification(id, 'Hi');

    return true;
  }
}
