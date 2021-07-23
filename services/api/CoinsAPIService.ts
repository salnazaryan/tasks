import { BaseAPIService } from './BaseApi';
import { ICoins, ICoin, ICoinChart } from '../../types';

export class CoinsAPIService extends BaseAPIService {
  constructor() {
    super('public/v1');
  }

  public async getCoins(query: string): Promise<{ data: { coins: ICoins } }> {
    return this.get(`/coins${query}`);
  }

  public async getCoin(id: string): Promise<{ data: { coin: ICoin } }> {
    return this.get(`/coins/${id}`);
  }

  public async getCoinChart(id: string, period: string = '24h'): Promise<{ data: { chart: ICoinChart } }> {
    return this.get(`/charts?coinId=${id}&period=${period}`);
  }
}
