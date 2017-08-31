'use strict';

/**
 * Module dependencies.
 */

const graphqlHTTP = require('koa-graphql');


module.exports = (_, app) => {
  const mw = graphqlHTTP({
    schema: app.schema,
    graphiql: true,
  });
  const graphQLRouter = app.config.graphql.router || '/graphql';

  return function* (next) {
    if (this.path === graphQLRouter) {
      return yield mw.call(this);
    }

    yield next;
  };
};
