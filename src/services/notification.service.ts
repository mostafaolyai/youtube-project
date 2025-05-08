/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly activeUsers = new Map<string, string>();
  /**
   *
   * {1: clientId1,
   * 2: clientId2
   * }
   */

  handleConnection(client: Socket) {
    console.log(`Client Connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected: ${client.id}`);

    const userId = Array.from(this.activeUsers.keys()).find(
      (key) => this.activeUsers.get(key) === client.id,
    );

    if (userId) this.activeUsers.delete(userId);
  }

  @SubscribeMessage('register')
  handleRegister(client: Socket, userId: string) {
    this.activeUsers.set(userId, client.id);
  }

  sendNotification(userId: string, message: string) {
    const socketId = this.activeUsers.get(userId);

    if (socketId) this.server.to(socketId).emit('notification', message);
  }
}
