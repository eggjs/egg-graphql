'use strict';

module.exports = {
  Query: {
    framework(root, { id }, ctx) {
      return ctx.connector.framework.fetchById(id);
    },
  },
};
