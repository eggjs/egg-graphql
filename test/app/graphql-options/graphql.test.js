'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/app/graphql-options.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/graphql-options-app',
    });
    return app.ready();
  });

  after(mm.restore);

  it('should return custom error, use formatError', async () => {
    const resp = await app.httpRequest()
      .get('/graphql?query=query+getUser($id:Int){user(id:$id){name}}&variables={"id":1}')
      .expect(200);
    assert.equal(resp.body.errors[0].code, 100001);
  });

  it('should return frameworks, user formatResponse', async () => {
    const resp = await app.httpRequest()
      .get('/graphql?query=query+getFramework($id:Int){framework(id:$id){name}}&variables={"id":1}')
      .expect(200);
    assert.deepEqual(resp.body.data, {
      frameworks: {
        name: 'framework1',
      },
    });
  });
});
