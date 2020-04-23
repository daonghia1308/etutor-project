const moment = require("moment")
module.exports = {


  friendlyName: 'Get meeting',


  description: '',


  inputs: {
    month: { type: "string" }
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
      let { month } = inputs;
      let findMeeting = await Meeting.find({createdAt: {'>=': month}}).sort("createdAt DESC")
      if (findMeeting.length > 0) {
        findMeeting.forEach(e => {
          e.type = "success"
        }); 
      }
      return exist.success({
        code: 0,
        data: findMeeting
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: "System error!"
      })
    }
  }


};
