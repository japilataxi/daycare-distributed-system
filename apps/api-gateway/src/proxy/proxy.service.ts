import { Injectable } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProxyService {
  constructor(private readonly config: ConfigService) {}

  authProxy() {
    return createProxyMiddleware({
      target: this.config.get<string>('AUTH_SERVICE_URL'),
      changeOrigin: true,
      pathRewrite: {
        '^/auth': '/auth',
      },
    });
  }
}
