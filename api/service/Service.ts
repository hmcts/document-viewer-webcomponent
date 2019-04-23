import * as path from "path";
import {config} from "../config/config";
import {logger} from "../config/logger";
import {Application} from "express";
import * as express from "express";
import {ClientRequest, Server} from "http";
import * as proxy from "http-proxy-middleware";
import {TokenRepository} from "../token/TokenRepository";
import {StatusController} from "./StatusController";

/**
 * Wrapper that boots express with auth headers and static folder
 */
export class Service {

  constructor(
    private readonly app: Application,
    private readonly serviceAuthRepository: TokenRepository,
    private readonly idamRepository: TokenRepository,
    private readonly statusController: StatusController
  ) {}

  /**
   * Start the service and return the running server
   */
  public async start(): Promise<Server> {
    const frontendRoot = path.join(__dirname, "..", "..", "frontend");

    this.app.use(express.static(frontendRoot));
    this.app.use("/health", this.statusController.getStatus);

    await this.initTokenRepositories();

    logger.info("idamToken: " + this.idamRepository.getToken());
    logger.info("s2sToken: " + this.serviceAuthRepository.getToken());

    const addHeaders = (req: ClientRequest) => {
      req.setHeader("Authorization", this.idamRepository.getToken());
      req.setHeader("ServiceAuthorization", this.serviceAuthRepository.getToken());
    };

    const proxyOptions = {
      onProxyReq: addHeaders,
      secure: false,
      changeOrigin: true
    };

    const annotationProxy = config.proxies.annotation;
    this.app.use(proxy(annotationProxy.endpoints, {
      target: annotationProxy.target,
      pathRewrite: annotationProxy.pathRewrite,
      ...proxyOptions
    }));

    const dmStoreProxy = config.proxies.dmStore;
    this.app.use(proxy(dmStoreProxy.endpoints, {
      target: dmStoreProxy.target,
      onProxyReq: (req: ClientRequest) => {
        req.setHeader("user-roles", "caseworker");
        req.setHeader("ServiceAuthorization", this.serviceAuthRepository.getToken());
      },
      secure: false,
      changeOrigin: true
    }));

    logger.info("Listening on port " + config.port);

    return this.app.listen(config.port);
  }

  private async initTokenRepositories(): Promise<void> {
    try {
      await Promise.all([
        this.serviceAuthRepository.init(),
        this.idamRepository.init()
      ]);
    }
    catch (err) {
      throw "Could not get tokens: " + err.message;
    }
  }
}
