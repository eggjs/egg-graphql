'use strict';

const assert = require('assert');
const gql = require('../../lib/graphql-tag');

describe('test/graphiql-tag.test.js', () => {
  it('should get graphiql html response', async () => {
    gql.resetCaches();
    gql.getCachedItemsCount();
    gql.setCacheOptions({ max: 1000, maxAge: 1000 * 60 * 60 * 24 });
    gql.enableExperimentalFragmentVariables();
    gql.disableExperimentalFragmentVariables();
  });

  it('stripLoc input error', async () => {
    try {
      gql.stripLoc('');
    } catch (error) {
      assert(error);
    }
  });

  it('Not a valid GraphQL document', async () => {
    try {
      gql.parseDocument('');
    } catch (error) {
      assert(error);
    }
  });
});
