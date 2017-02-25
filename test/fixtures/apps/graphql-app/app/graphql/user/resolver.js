'use strict';

/**
 * Module dependencies.
 */

module.exports = {
  User: {
    user({ user_id }, _, ctx) {
      return ctx.connector.user.fetchById(user_id);
    }
  },
};
