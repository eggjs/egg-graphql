'use strict';

const graphqlHTTP = require('koa-graphql');


module.exports = (_, app) => {
  let switchGraphiql = true;
  if (app.config.graphql.graphiql === false) {
    switchGraphiql = false;
  }
  const mw = graphqlHTTP({
    schema: app.schema,
    graphiql: switchGraphiql,
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
