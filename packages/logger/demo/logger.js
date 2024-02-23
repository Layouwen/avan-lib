"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../src/utils");
const logger = new utils_1.Logger();
logger.error.error("error");
logger.daily.warn("warn");
logger.daily.info("info");
logger.debug.debug("debug");
