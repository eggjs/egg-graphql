'use strict';
// 在 connector 里面可以调用 await this.ctx.service.xxx() 去获取数据
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
