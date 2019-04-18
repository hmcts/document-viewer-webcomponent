import { AxiosInstance } from "axios";
import { URLSearchParams } from "url";

const email = "emshowcase@hmcts.net";
const password = "4590fgvhbfgbDdffm3lk4j";
const forename = "em-showcase";
const surname = "testuser";

/**
 * IDAM client that creates a user then gets a token
 */
export class IdamClient {

  constructor(
    private readonly http: AxiosInstance,
    private readonly client: string,
    private readonly secret: string,
    private readonly redirect: string
  ) {}

  /**
   * Create a user then generate a token for it
   */
  public async getToken(): Promise<string> {
    await this.createUser();

    const code = await this.getCode();
    const token = await this.getIdamToken(code);

    return `Bearer ${token}`;
  }

  private async createUser() {
    try {
      await this.http.post("/testing-support/accounts", { email, password, forename, surname });
    } catch (err) {

    }
  }

  private async getCode(): Promise<string> {
    const auth = { username: email, password };

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    const params = new URLSearchParams();
    params.append("redirect_uri", this.redirect);
    params.append("client_id", this.client);
    params.append("response_type", "code");

    const response = await this.http.post("/oauth2/authorize", params, { auth, headers });

    return response.data.code;
  }

  private async getIdamToken(code: string): Promise<string> {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    const params = new URLSearchParams();
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", this.redirect);
    params.append("client_id", this.client);
    params.append("client_secret", this.secret);

    const response = await this.http.post("/oauth2/token", params, { headers });

    return response.data["access_token"];
  }

}
