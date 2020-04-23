module.exports = {


  friendlyName: 'Get action log',


  description: '',


  inputs: {
    id: { type: 'number' },
    skip: {type: 'number'},
    limit: {type: 'number'}
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
      let { id, skip, limit } = inputs;
      let actions = await ActionLog.find({user: id}).skip(skip).limit(limit);
      return exits.success({
        code: 0,
        data: actions
      })
    } catch (error) {
      return exits.fail({
        code: 1,
        err: error,
        message: 'Hệ thống gặp vấn đề, quay lại sau!'
      })
    }
  }


};
