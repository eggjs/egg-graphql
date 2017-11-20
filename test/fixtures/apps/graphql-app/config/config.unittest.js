'use strict';

exports.keys = 'plugin-graphql';
exports.middleware = [ 'graphql' ];
exports.graphql = {
  graphiql: true,
  * onPreGraphiQL(ctx) {
    yield ctx.service.user.getUserList();
    return {};
  },
};
