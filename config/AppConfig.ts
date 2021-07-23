import { IAppConfig } from '../types';

export const AppConfig: IAppConfig = {
  httpAPIGatewayURL: process.env.APP_API_URL || '',
};
