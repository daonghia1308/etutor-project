module.exports = {


  friendlyName: 'Update user',


  description: '',


  inputs: {
    id: {
      type: 'number'
    },
    fullName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    phone: {
      type: 'string'
    }
  },


  exits: {
    success: {
      statusCode: 200
    },
    fail: {
      statusCode: 400
    },
    serverError: {
      statusCode: 500
    }
  },


  fn: async function (inputs, exits) {
    try {
      let { id, fullName, email, phone } = inputs
      if (!id) {
        return exits.fail({
          code: 1,
          message: "User not exist!"
        })
      }
      let findUser = await User.findOne({email: email});
      if(findUser) {
        return exits.fail({
          code: 1,
          message: 'Email has been exist!'
        })
      }
      await User.update(id).set({
        fullName,
        phone,
        email
      })
      return exits.success({
        code: 0,
        message: "Update user success!"
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: 'System error'
      })
    }


  }


};
