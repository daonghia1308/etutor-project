module.exports = {


  friendlyName: 'Send mes',


  description: '',


  inputs: {
    text: { type: 'string' },
    classId: {type: 'number'},
    id: {type: "number", description: "Id người gửi tin nhắn"}
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
      let { text, classId, id } = inputs;
      let data = {
        text,
        sendBy: id,
        class: classId
      }
      let createMess = await ChatMs.create(data).fetch();
      sails.sockets.blast('chatmessage', {
        id: createMess.id,
        text: createMess.text,
        sendBy: createMess.sendBy
      })
      return exits.success({
        code: 0,
        data: createMess
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: "He thong gap van de quay lai sau!"
      })
    }
  }


};
