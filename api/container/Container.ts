import {Service} from "../service/Service";
import * as express from "express";
import {ServiceAuthProviderClient} from "../token/ServiceAuthProviderClient";
import Axios from "axios";
import {config} from "../config/config";
import {IdamClient} from "../token/IdamClient";
import {StatusController} from "../service/StatusController";
import { TokenClient, TokenRepository } from "../token/TokenRepository";

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

  private getServiceAuthProviderClient(): ServiceAuthProviderClient {
    return new ServiceAuthProviderClient(
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
