'use strict';

const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');

class LowerCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      let result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        result = result.toLowerCase();
      }
      return result;
    };
  }
}

module.exports = {
  lowerCase: LowerCaseDirective,
};
