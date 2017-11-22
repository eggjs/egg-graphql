'use strict';

const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');

module.exports = (_, app) => {
  const options = app.config.graphql;
  const graphQLRouter = options.router;
  let graphiql = true;

  if (options.graphiql === false) {
    graphiql = false;
  }

  return async (ctx, next) => {
    /* istanbul ignore else */
    if (ctx.path === graphQLRouter) {
      if (ctx.request.accepts([ 'json', 'html' ]) === 'html' && graphiql) {
        if (options.onPreGraphiQL) {
          await options.onPreGraphiQL(ctx);
        }
        return graphiqlKoa({
          endpointURL: graphQLRouter,
        })(ctx);
      }
      if (options.onPreGraphQL) {
        await options.onPreGraphQL(ctx);
      }
      return graphqlKoa({
        schema: app.schema,
        context: ctx,
      })(ctx);
    }
    await next();
  };
};
