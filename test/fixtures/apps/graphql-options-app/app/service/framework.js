'use strict';

module.exports = app => {
  class FrameworkService extends app.Service {
    async getFrameworkList() {
      return [
        { id: 1, name: 'framework1' },
        { id: 2, name: 'framework2' },
      ];
    }
  }
  return FrameworkService;
};
