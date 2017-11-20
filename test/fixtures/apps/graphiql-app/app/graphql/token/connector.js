
'use strict';
class TokenConnector {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async createToken() {
    return {
      success: true,
      message: 'ok',
    };
  }

  async updateToken() {
    return {
      success: true,
      message: 'ok',
    };
  }

  async deleteToken() {
    return {
      success: true,
      message: 'ok',
    };
  }

  async getTokenById() {
    return {
      success: true,
      message: 'ok',
      data: { id: '1' },
    };
  }

  async getTokenList() {
    return {
      success: true,
      message: 'ok',
      data: [
        { id: '1' },
        { id: '2' },
      ],
    };
  }
}
module.exports = TokenConnector;
