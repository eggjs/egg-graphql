'use strict';

const DataLoader = require('dataloader');

class FrameworkConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  fetch(ids) {
    return Promise.resolve(ids.map(id => ({
      id,
      name: `framework${id}`,
      projects: [],
    })));
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    return this.loader.load(id);
  }

}

module.exports = FrameworkConnector;

