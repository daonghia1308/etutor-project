/**
 * Class.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    tutor: {
      model: "User"
    },
    description: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    students: {
      model: "User"
    }
  },

};

