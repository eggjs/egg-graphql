'use strict';

exports.keys = 'plugin-graphql';
exports.middleware = [ 'graphql' ];
exports.graphql = {
  router: '/graphql',
  graphiql: false,
  async onPreGraphQL(ctx) {
    await ctx.service.user.getUserList();
    return {};
  },
  async onPreGraphiQL(ctx) {
    await ctx.service.user.getUserList();
    return {};
  },
};
