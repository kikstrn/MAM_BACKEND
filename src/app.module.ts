import { CacheModule, ClassSerializerInterceptor, MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { LoggerMiddleware } from "./logger.middleware";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ReviewModule } from './review/review.module';
import { GamesModule } from "./game/games.module";
import { MongooseModule } from "@nestjs/mongoose";
import { environement } from "./environements/environement.dev";
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    MongooseModule.forRoot(environement.MONGO),
    UsersModule,
    GamesModule,
    EventsModule,
    ReviewModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    },
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}