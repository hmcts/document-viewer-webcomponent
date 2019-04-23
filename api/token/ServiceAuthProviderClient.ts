import { AxiosInstance } from "axios";
import * as otp from "otp";

/**
 * Client for the service auth provider API that fetches an S2S token
 */
export class ServiceAuthProviderClient {

  constructor(
    private readonly http: AxiosInstance,
    private readonly microservice: string,
    private readonly secret: string
  ) {}

  /**
   * Generate a one time password and fetch an S2S token
   */
  public async getToken(): Promise<string> {
    const body = {
      microservice: this.microservice,
      oneTimePassword: otp({ secret: this.secret }).totp(),
    };

    const response = await this.http.post("/lease", body);

    return `Bearer ${response.data}`;
  }
}
