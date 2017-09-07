'use strict';

module.exports = function(app) {
  app.get('/user', function* () {
    const req = {
      query: `{
        user(id: 2) {
          name
        }
      }`,
    };
    this.body = yield this.graphql.query(JSON.stringify(req));
  });
};
