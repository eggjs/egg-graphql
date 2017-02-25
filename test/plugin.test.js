'use strict';

const assert = require('assert');
const mm = require('egg-mock');
const request = require('supertest');

describe('test/plugin.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/graphql-app',
    });
    return app.ready();
  });

  after(mm.restore);

  it('graphql init success', function() {
    const schema = app.schema;
    const connector = app.connector;
  });

  it('should get data from create', function* () {
    app.mockCsrf();

    yield request(app.callback())
    .post('/users')
    .send({
      name: 'popomore',
    });
    const res = yield request(app.callback())
      .get('/users');
    assert(res.body[0].name === 'popomore');
  });
});
