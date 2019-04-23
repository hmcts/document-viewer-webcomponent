import { Container } from "./container";
import { logger } from "./logger";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const container = new Container();

container
  .getService()
  .start()
  .catch(e => logger.error(e));
