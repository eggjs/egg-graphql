'use strict';

module.exports = () => {
  class Framework {
    find(ids) {
      return ids.map(id => ({
        id,
        name: `name${id}`,
      }));
    }
  }

  return Framework;
};
