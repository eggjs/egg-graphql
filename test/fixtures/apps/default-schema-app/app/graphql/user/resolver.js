'use strict';
const Users = [];
module.exports = {
  Query: {
    user(root, { id }) {
      // eslint-disable-next-line eqeqeq
      const user = Users.find(user => user.id == id);
      return user;
    },
  },
  Mutation: {
    addUser(root, { password, name }) {
      const id = Users.length + 1;
      const user = {
        id,
        password,
        name,
      };

      Users.push(user);
      return user;
    },
  },
};
