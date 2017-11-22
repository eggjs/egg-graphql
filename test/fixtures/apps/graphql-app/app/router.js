'use strict';

module.exports = function(app) {
  app.get('/user', async ctx => {
    const req = {
      query: `{
        user(id: 2) {
          name
        }
      }`,
    };
    ctx.body = await ctx.graphql.query(JSON.stringify(req));
  });
};
