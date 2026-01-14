import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { ProxyModule } from './proxy/proxy.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      { ttl: 60, limit: 100 },
    ]),
    PassportModule,
    ProxyModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy],
})
export class AppModule {}
