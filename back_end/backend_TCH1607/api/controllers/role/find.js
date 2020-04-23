module.exports = {


  friendlyName: 'Find',


  description: 'Find role.',


  inputs: {

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
      let findRoles = await Role.find();
      return exits.success({
        code: 0,
        data: findRoles
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: "Hệ thống gặp vấn đề quay lại sau!"
      })
    }
  }


};
