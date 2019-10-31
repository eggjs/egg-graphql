'use strict';

exports.keys = 'plugin-graphql';
exports.middleware = [ 'graphql' ];

function checkNested(obj, level, ...rest) {
  if (obj === undefined) return false;
  if (rest.length === 0 && obj.hasOwnProperty(level)) return true;
  return checkNested(obj[level], ...rest);
}

exports.graphql = {
  graphiql: true,
  async onPreGraphiQL(ctx) {
    await ctx.service.user.getUserList();
    await ctx.service.framework.getFrameworkList();
    return {};
  },
  apolloServerOptions: {
    formatError(err) {
      if (err.code === 100001) {
        err.message = 'api error';
      } else {
        err.message = 'unknown';
      }
      return err;
    },
    formatResponse(ctx, context) {
      const name = context.context.app.changedName; // use egg context & app
      const data = ctx.data;
      if (data.framework !== undefined) {
        data[name] = data.framework;
        delete data.framework;
      }
      for (const i in ctx.errors) {
        const error = ctx.errors[i];
        if (checkNested(error, 'extensions', 'exception', 'code')) {
          error.code = error.extensions.exception.code;
          delete error.extensions;
        }
      }
      return ctx;
    },
  },
};
