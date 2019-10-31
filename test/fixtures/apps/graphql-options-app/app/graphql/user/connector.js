'use strict';

const DataLoader = require('dataloader');

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  fetch(ids) {
    // this.ctx.model.user.find(ids);
    return Promise.resolve(ids.map(id => ({
      id,
      name: `name${id}`,
      upperName: `name${id}`,
      lowerName: `name${id}`,
      password: `password${id}`,
      projects: [],
    })));
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  // eslint-disable-next-line no-unused-vars
  fetchById(id) {
    const err = new Error();
    err.code = 100001;
    throw err;
    // return this.loader.load(id);
  }

}

module.exports = UserConnector;

