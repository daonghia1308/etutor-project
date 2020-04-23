/**
 * PostComment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    content: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    commentBy: {
      model: "User"
    },
    post: {
      model: "Post"
    }
  },

};

