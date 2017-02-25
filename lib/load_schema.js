'use strict';

/**
 * Module dependencies.
 */

const fs = require('fs');
const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const symbol_schema = Symbol('schema');

module.exports = app => {
  const types = fs.readdirSync(path.join(__dirname, 'types'));

  const schemas = [];
  const resolverMap = {};

  types.forEach(type => {
    // 加载schema
    const schemaFile = path.join(__dirname, `types/${type}/schema.graphql`);
    if (fs.existsSync(schemaFile)) {
      const schema = fs.readFileSync(schemaFile, { encoding: 'utf8' });
      schemas.push(schema);
    }

    // 加载resolver
    const resolverFile = path.join(__dirname, `types/${type}/resolver.js`);
    if (fs.existsSync(resolverFile)) {
      const resolver = require(resolverFile);
      Object.assign(resolverMap, resolver);
    }
  });

  Object.defineProperty(app, 'schema', {
    get() {
      if (!this[symbol_schema]) {
        this[symbol_schema] = makeExecutableSchema({
          typeDefs: schemas,
          resolvers: resolverMap,
        });
      }
      return this[symbol_schema];
    },
  });

};
