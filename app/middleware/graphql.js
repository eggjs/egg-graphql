'use strict';

const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');

module.exports = (_, app) => {
  const graphQLRouter = app.config.graphql.router;
  let graphiql = true;

  if (app.config.graphql.graphiql === false) {
    graphiql = false;
  }

  return function* (next) {
    /* istanbul ignore else */
    if (this.path === graphQLRouter) {
      if (this.request.accepts([ 'json', 'html' ]) === 'html' && graphiql) {
        if (app.config.graphql.onPreGraphiQL) {
          yield app.config.graphql.onPreGraphiQL(this);
        }
        return graphiqlKoa({
          endpointURL: graphQLRouter,
        })(this);
      }

      if (app.config.graphql.onPreGraphQL) {
        yield app.config.graphql.onPreGraphQL(this);
      }
      return graphqlKoa({
        schema: app.schema,
        context: this,
      })(this);
    }

    yield next;
  };
};
