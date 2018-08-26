'use strict';

// Notice that this path is totally changed, because this function isn't
// directly exposed to the public, now we must still use that for the middle-
// ware.
const { graphqlKoa } = require('apollo-server-koa/dist/koaApollo');

// This has been newly imported, because in v2 of apollo-server, this is removed.
const { resolveGraphiQLString } = require('apollo-server-module-graphiql');

/**
 This function is directly copied from:
 https://github.com/apollographql/apollo-server/blob/300c0cd12b56be439b206d55131e1b93a9e6dade/packages/apollo-server-koa/src/koaApollo.ts#L51

 And now this has been removed since v2 at:
 https://github.com/apollographql/apollo-server/commit/dbaa465646b0acb839860a85bfd68fb4379d64ab#diff-64af8fdf76996fa3ed4e498d44124800

 So we must keep this here to be compatible with what it was before.
 Thus users can directly use that by upgrading graphql to the v2 WITHOUT
 doing any other big changes.

 * @param {Object} options The `options` of graphiqlKoa.
 * @return {Promise} The result of the graphiqlKoa.
 */
function graphiqlKoa(options) {
  return ctx => {
    const query = ctx.request.query;
    return resolveGraphiQLString(query, options, ctx)
      .then(graphiqlString => {
        ctx.set('Content-Type', 'text/html');
        ctx.body = graphiqlString;
      });
  };
}

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
