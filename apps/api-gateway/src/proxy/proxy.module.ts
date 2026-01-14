import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Module({
  providers: [ProxyService],
})
export class ProxyModule {
  constructor(private readonly proxyService: ProxyService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(this.proxyService.authProxy())
      .forRoutes({ path: 'auth/*path', method: RequestMethod.ALL });
  }
}
