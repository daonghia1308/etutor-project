/**
 * Meeting.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    time: {
      type: "number",
      required: true
    },
    class: {
      model: "Class"
    }
  },

};

