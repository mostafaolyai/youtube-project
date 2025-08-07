import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationService } from './services/notification.service';
import { TypeModule } from './database/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return {
          debug: config.get('GRAPHQL_DEBUG') === 'true',
          playground: config.get('GRAPHQL_PLAYGROUND') === 'true',
          autoSchemaFile: 'src/schema.gql',
          sortSchema: true,
        };
      },
      inject: [ConfigService],
    }),
    TypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, NotificationService],
})
export class AppModule {}
