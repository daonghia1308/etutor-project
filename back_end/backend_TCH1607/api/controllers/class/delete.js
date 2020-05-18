module.exports = {


  friendlyName: 'Delete',


  description: 'Delete class.',


  inputs: {
    id: {type: 'number'}
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
      let {id} = inputs;
      let findClass = await Class.findOne(id);
      if(!findClass) {
        return exits.fail({
          code: 1,
          message: 'Không tìm thấy lớp học!'
        })
      }
      await Class.destroy(id);
      return exits.success({
        code: 0,
        message: 'Xóa lớp học thành công!'
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
