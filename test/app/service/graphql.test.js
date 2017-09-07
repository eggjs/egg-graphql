'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/plugin.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/graphql-app',
    });
    return app.ready();
  });

  after(mm.restore);

  it('should return user with no projects', function* () {
    const ctx = app.mockContext();
    const query = JSON.stringify({
      query: '{ user(id: 3) { projects } }',
    });
    const resp = yield ctx.graphql.query(query);
    assert.deepEqual(resp.data, { user: { projects: [] } });
  });

  it('should return error', function* () {
    const ctx = app.mockContext();
    const resp = yield ctx.graphql.query('');
    assert.deepEqual(resp.data, {});
    assert.equal(resp.errors[0].message, 'Unexpected end of JSON input');
  });

});
