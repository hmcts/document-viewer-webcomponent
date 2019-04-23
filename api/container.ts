import {Service} from "./service";
import * as express from "express";
import {S2sClient} from "./auth/s2s-client";
import Axios from "axios";
import {config} from "./config";
import {IdamClient} from "./auth/idam-client";
import {StatusController} from "./status-controller";
import { TokenClient, TokenRepository } from "./auth/token-repository";

/**
 * Dependency container
 */
export class Container {

  public getService(): Service {
    return new Service(
      express(),
      this.getTokenRepository(this.getServiceAuthProviderClient()),
      this.getTokenRepository(this.getIdamClient()),
      new StatusController()
    );
  }

  private getServiceAuthProviderClient(): S2sClient {
    return new S2sClient(
      Axios.create({
        baseURL: config.s2s.url,
        headers: {
          "Content-Type": "application/json"
        }
      }),
      config.s2s.microservice,
      config.s2s.secret
    );
  }

  private getTokenRepository(client: TokenClient): TokenRepository {
    return new TokenRepository(client, config.tokenRefreshTime);
  }

  private getIdamClient(): IdamClient {
    return new IdamClient(
      Axios.create({
        baseURL: config.idam.url
      }),
      config.idam.client,
      config.idam.secret,
      config.idam.redirect
    );
  }

}
