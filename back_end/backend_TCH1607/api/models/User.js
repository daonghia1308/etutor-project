/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    fullName: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    phone: {
      type: 'string'
    },
    email: {
      type: 'string',
      isEmail: true,
      unique: true
    },
    role: {
      model: 'Role'
    }
  },

};

