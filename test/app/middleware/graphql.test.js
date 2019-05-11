'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/app/middleware.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/graphql-app',
    });
    return app.ready();
  });

  after(mm.restore);

  it('should return user 1', async () => {
    const resp = await app.httpRequest()
      .get('/graphql?query=query+getUser($id:Int){user(id:$id){name}}&variables={"id":1}')
      .expect(200);

    assert.deepEqual(resp.body.data, {
      user: {
        name: 'name1',
      },
    });
  });

  it('should return user 2', async () => {
    const resp = await app.httpRequest()
      .get('/user')
      .expect(200);

    assert.deepEqual(resp.body.data, {
      user: {
        name: 'name2',
      },
    });
  });

  it('should return framework 1', async () => {
    const resp = await app.httpRequest()
      .get('/graphql?query=query+getFramework($id:Int){framework(id:$id){name}}&variables={"id":1}')
      .expect(200);
    assert.deepEqual(resp.body.data, {
      framework: {
        name: 'framework1',
      },
    });
  });

  it('should return framework 2', async () => {
    const resp = await app.httpRequest()
      .get('/framework')
      .expect(200);

    assert.deepEqual(resp.body.data, {
      framework: {
        name: 'framework2',
      },
    });
  });
});
