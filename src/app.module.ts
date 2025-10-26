import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationService } from './services/notification.service';

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
          transformSchema: (schema) => {
            const queryType = schema.getQueryType();
            if (queryType) {
              Object.keys(queryType.getFields()).forEach((field) => {
                if (['bye'].includes(field)) {
                  delete queryType.getFields()[field];
                }
              });
            }
            // const mutationType = schema.getMutationType();
            // if (mutationType) {
            //   Object.keys(mutationType.getFields()).forEach((field) => {
            //     if (phase2.includes(field) || phase3.includes(field)) {
            //       delete mutationType.getFields()[field];
            //     }
            //   });
            // }
            return schema;
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, NotificationService],
})
export class AppModule {}
