'use strict';

/**
 * Module dependencies.
 */

const fs = require('fs');
const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');

const symbolSchema = Symbol('schema');

module.exports = app => {
  const basePath = path.join(app.baseDir, 'app/graphql');
  const types = fs.readdirSync(basePath);

  const schemas = [];
  const resolverMap = {};

  types.forEach(type => {
    // 加载schema
    const schemaFile = `${basePath}/${type}/schema.graphql`;
    if (fs.existsSync(schemaFile)) {
      const schema = fs.readFileSync(schemaFile, { encoding: 'utf8' });
      schemas.push(schema);
    }

    // 加载resolver
    const resolverFile = `${basePath}/${type}/resolver.js`;
    if (fs.existsSync(resolverFile)) {
      const resolver = require(resolverFile);
      Object.assign(resolverMap, resolver);
    }
  });

  Object.defineProperty(app, 'schema', {
    get() {
      if (!this[symbolSchema]) {
        this[symbolSchema] = makeExecutableSchema({
          typeDefs: schemas,
          resolvers: resolverMap,
        });
      }
      return this[symbolSchema];
    },
  });
};
