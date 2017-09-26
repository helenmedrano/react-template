import config from "core/config";

const identity = x => x;

/* eslint-disable no-console */
let logger = {
  dir: identity,
  info: identity,
  warn: identity,
  group: identity,
  groupEnd: identity,
  error: console.error
};

if (config.isDevelop) {
  logger = {
    dir: console.dir,
    group: console.groupCollapsed,
    groupEnd: console.groupEnd,
    info: console.info,
    warn: console.warn,
    error: console.error
  };
}
/* eslint-enable no-console */

module.exports = logger;
