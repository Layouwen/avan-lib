import { Logger } from "../src/utils";

const logger = new Logger();

logger.error.error("error");
logger.daily.warn("warn");
logger.daily.info("info");
logger.debug.debug("debug");
