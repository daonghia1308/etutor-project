module.exports = {


  friendlyName: 'Create',


  description: 'Create class.',


  inputs: {
    name: { type: 'string' },
    description: {type: 'string'}
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
      let { name, description } = inputs
      if (!name) {
        return exits.fail({
          code: 1,
          message: 'Cần nhập đủ dữ liệu để tạo lớp!'
        })
      }
      let classCreate = {
        name,
        description
      }
      await Class.create(classCreate)
      return exits.success({
        code: 0,
        message: 'Tạo lớp thành công!'
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: "Hệ thống gặp vấn đề, quay lại sau!"
      })
    }
  }


};
