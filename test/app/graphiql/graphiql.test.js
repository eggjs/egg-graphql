'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/graphiql.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/graphql-app',
    });
    return app.ready();
  });

  after(mm.restore);

  it('should get graphiql html response', async () => {
    app.mockHttpclient('/graphql', 'GET', {});
    const result = await app.httpRequest()
      .get('/graphql')
      .set('Accept', 'text/html')
      .expect(200);

    assert(result.type, 'text/html');
  });
});
