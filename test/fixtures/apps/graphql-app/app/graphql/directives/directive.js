'use strict';

module.exports = {
  upper(next) {
    return next().then(str => {
      if (typeof str === 'string') {
        return str.toUpperCase();
      }
      return str;
    });
  },
};
