'use strict';

module.exports = app => {
  class UserService extends app.Service {
    async getUserList() {
      return [
        { id: '1', name: 'user1' },
        { id: '2', name: 'user2' },
      ];
    }
  }
  return UserService;
};
