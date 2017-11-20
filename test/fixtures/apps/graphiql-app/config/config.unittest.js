'use strict';

exports.keys = 'plugin-graphql';
exports.middleware = [ 'graphql' ];
exports.graphql = {
  router: '/graphql',
  graphiql: false,
  * onPreGraphQL(ctx) {
    yield ctx.service.user.getUserList();
    return {};
  },
  * onPreGraphiQL(ctx) {
    yield ctx.service.user.getUserList();
    return {};
  },
};
