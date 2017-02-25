'use strict';

module.exports = function(app) {
  app.get('/test', function* () {
    const req = {
      query: `{
        templates {
          id
        }
      }`,
    };
    this.body = yield this.service.graphql(JSON.stringify(req));
  });
};
