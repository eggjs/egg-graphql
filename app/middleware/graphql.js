'use strict';

const graphqlHTTP = require('koa-graphql');


module.exports = (_, app) => {
  const mw = graphqlHTTP({
    schema: app.schema,
    graphiql: true,
  });
  const graphQLRouter = app.config.graphql.router;

  return function* (next) {

    /* istanbul ignore else */
    if (this.path === graphQLRouter) {
      return yield mw.call(this);
    }

    yield next;
  };
};
