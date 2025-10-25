import { registerAs } from '@nestjs/config';

export interface AppConfig {
  nodeEnv: string;
  port: number;
  apiToken: string;
}

export default registerAs('app', (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.APP_PORT || '3000', 10),
  apiToken: process.env.API_TOKEN || 'default-token',
}));

