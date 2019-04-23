import { logger } from "../logger";
import Timeout = NodeJS.Timeout;

/**
 * Stateful repository that stores a token and refreshes it periodically
 */
export class TokenRepository {

  private token: string = "";
  private refreshHandler: Timeout | undefined;

  constructor(
    private readonly client: TokenClient,
    private readonly tokenRefreshTime: number
  ) {}

  /**
   * Fetch a token and schedule the interval to refresh it
   */
  public async init(): Promise<void> {
    await this.updateToken();

    this.refreshHandler = setInterval(() => this.updateToken(), this.tokenRefreshTime);
  }

  /**
   * Stop refreshing the token and clean up the interval
   */
  public destroy(): void {
    if (this.refreshHandler) {
      clearInterval(this.refreshHandler);
    }
  }

  private async updateToken(): Promise<void> {
    this.token = await this.client.getToken();

    logger.log("Refreshed token");
  }

  /**
   * Return the current token
   */
  public getToken(): string {
    return this.token;
  }

}

export interface TokenClient {
  getToken(): Promise<string>;
}
