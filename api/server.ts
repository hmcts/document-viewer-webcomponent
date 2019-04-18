import { Container } from "./container/Container";
import { logger } from "./config/logger";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const container = new Container();

container
  .getService()
  .start()
  .catch(e => logger.error(e));
