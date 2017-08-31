'use strict';

/**
 * Module dependencies.
 */

const { execute, formatError } = require('graphql');
const gql = require('graphql-tag');

module.exports = app => {
  class GraphqlService extends app.Service {
    constructor(ctx) {
      super(ctx);

      this.app = ctx.app;
    }

    * graphql(requestString) {
      let result = {};
      const ctx = this.ctx;

      try {
        const params = JSON.parse(requestString);
        const { query, variables, operationName } = params;

        // GraphQL source.
        // https://github.com/apollostack/graphql-tag#caching-parse-results
        const documentAST = gql`${query}`;
        const context = ctx;
        const schema = this.app.schema;

        // http://graphql.org/graphql-js/execution/#execute
        result = yield execute(
          schema,
          documentAST,
          null,
          context,
          variables,
          operationName
        );

        // Format any encountered errors.
        if (result && result.errors) {
          result.errors = result.errors.map(formatError);
        }
      } catch (e) {
        this.logger.error(e);

        result = {
          data: null,
          errors: [ e ],
        };
      }

      return result;
    }
  }

  return GraphqlService;
};
