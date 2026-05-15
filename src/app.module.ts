import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';
import { RequestLoggingMiddleware } from './common/middleware/request-logging.middleware';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    // AuthModule,
    // DraftModule,
    // OnboardingModule,
    // SettingsModule,
    // ImportModule,
    // TenantModule,
    // OutletModule,
    // ProductModule,
    // StockModule,
    // InvoiceModule,
    // DeficitModule,
    // StockAuditModule,
    // DailyCounterModule,
    // PasswordResetModule,
    // HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply request logging middleware first (for all requests)
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');

    // Apply rate limiting middleware to all routes
    consumer.apply(RateLimitMiddleware).forRoutes('*');
  }
}
