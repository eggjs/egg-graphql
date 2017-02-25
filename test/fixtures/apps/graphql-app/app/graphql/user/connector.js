'use strict';

/**
 * Module dependencies.
 */

const DataLoader = require('dataloader');

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  get proxy() {
    return this.ctx.proxy.user;
  }

  fetch(ids) {
    return this.proxy.select({
      where: {
        id: ids,
      },
    });
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    return this.loader.load(id);
  }

  select(option) {
    return this.proxy.select(option);
  }
}

module.exports = UserConnector;

