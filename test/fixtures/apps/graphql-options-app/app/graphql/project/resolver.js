'use strict';

module.exports = app => {
  return {
    Query: {
      projects() {
        console.log(app);
        return [];
      },
    },
  };
};
