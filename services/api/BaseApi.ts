import axios from 'axios';
import { AppConfig } from '../../config';

export class BaseAPIService {
  private readonly prefix: string = '';
  private readonly appAPiURL: string = '';

  constructor(prefix: string) {
    this.appAPiURL = AppConfig.httpAPIGatewayURL;
    this.prefix += prefix;
  }

  public get(url: string): Promise<any> {
    return axios.get(`${this.appAPiURL}/${this.prefix}${url}`);
  }
}
