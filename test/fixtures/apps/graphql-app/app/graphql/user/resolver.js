'use strict';

/**
 * Module dependencies.
 */

module.exports = {
  Query: {
    user(root, { id }, ctx) {
      return ctx.connector.user.fetchById(id);
    },
  },
};
