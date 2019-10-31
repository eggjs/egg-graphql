'use strict';

module.exports = () => {
  class User {
    find(ids) {
      return ids.map(id => ({
        id,
        name: `name${id}`,
        password: `password${id}`,
      }));
    }
  }

  return User;
};
