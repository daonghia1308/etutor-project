module.exports = {


  friendlyName: 'Get mess',


  description: '',


  inputs: {
    id: { type: 'number', description: "id lớp học"}
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
      let { id } = inputs;
      let findMess = await ChatMs.find({class: id});
      return exits.success({
        code: 0,
        data: findMess
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: 'System error!'
      })
    }
  }


};
