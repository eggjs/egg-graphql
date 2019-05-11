'use strict';

exports.keys = 'plugin-graphql';
exports.middleware = [ 'graphql' ];
exports.graphql = {
  graphiql: true,
  async onPreGraphiQL(ctx) {
    await ctx.service.user.getUserList();
    await ctx.service.framework.getFrameworkList();
    return {};
  },
};
