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

  it('graphql service', function* () {
    const ctx = app.mockContext();
    const query = JSON.stringify({
      query: '{ user(id: 1) { name } }',
    });
    const resp = yield ctx.service.graphql.graphql(query);
    assert.deepEqual(resp.data, { user: { name: 'name1' } });
  });

  it('graphql request', function* () {
    const resp = yield app.httpRequest()
    .get('/graphql?query=query+getUser($id:Int){user(id:$id){name}}&variables={"id":2}')
    .expect(200);

    assert.deepEqual(resp.body.data, { user: { name: 'name2' } });
  });
});
