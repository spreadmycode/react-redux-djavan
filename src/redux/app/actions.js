import * as c from './constants';

export const initialize = () => ({
  type: c.INITIALIZE,
});

export const noty = options => ({
  type: c.NOTY,
  options,
});
