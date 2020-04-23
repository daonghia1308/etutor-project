const jwt = require('jsonwebtoken')
module.exports = {


  friendlyName: 'Verify',


  description: 'Verify jwt.',


  inputs: {
    token: {type: 'string'}
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,
  fn: function (inputs) {
    let { token } = inputs;
    return jwt.verify(token, "sescret")
  }


};

