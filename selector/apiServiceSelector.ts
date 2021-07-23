import { CoinsAPIService } from '../services';

class ApiServiceSelector {
  private static coinsAPIService: CoinsAPIService;

  public static getCoinsAPIService(): CoinsAPIService {
    if (!this.coinsAPIService) {
      this.coinsAPIService = new CoinsAPIService();
    }
    return this.coinsAPIService;
  }
}

export function getCoinsAPIService(): CoinsAPIService {
  return ApiServiceSelector.getCoinsAPIService();
}
