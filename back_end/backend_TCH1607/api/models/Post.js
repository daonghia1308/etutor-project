/**
 * Post.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    postBy: {
      model: 'User'
    },
    content: {
      type: "string",
      columnType: 'text CHARACTER SET utf8mb4'
    },
    files: {
      type: 'json',
      custom: function (value) {
        return Array.isArray(value);
      },
      defaultsTo: []
    },
    images: {
      type: 'json',
      custom: function (value) {
        return Array.isArray(value);
      },
      defaultsTo: []
    },
    class: {
      model: "Class"
    }
  },

};

