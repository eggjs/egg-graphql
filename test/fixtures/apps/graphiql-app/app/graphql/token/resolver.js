'use strict';

const moment = require('moment');

module.exports = {
  Token: {
    gmtCreate: obj => {
      return moment(obj.gmtCreate).format('YYYY-MM-DD HH:mm:ss');
    },
    gmtModified: obj => {
      return moment(obj.gmtModified).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  Query: {
    getTokenById: (root, args, ctx) => {
      const params = args.input;
      return ctx.connector.token.getTokenById(params);
    },
    getTokenList: (root, args, ctx) => {
      const params = args.input;
      return ctx.connector.token.getTokenList(params);
    },
  },
  Mutation: {
    createToken: (root, args, ctx) => {
      const params = args.input;
      return ctx.connector.token.createToken(params);
    },
    updateToken: (root, args, ctx) => {
      const params = args.input;
      return ctx.connector.token.updateToken(params);
    },
    deleteToken: (root, args, ctx) => {
      const params = args.input;
      return ctx.connector.token.deleteToken(params);
    },
  },
};
