module.exports = {


  friendlyName: 'Get class',


  description: '',


  inputs: {
    id: { type: 'number' },
    type: {type: 'string'}
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
      let { id, type } = inputs;
      let findClasses;
      let findUser = await User.findOne({id: id});
      if (!findUser) {
        return exits.fail({
          code: 1,
          message: "User not exist!"
        })
      }
      if(type == "all") {
        findClasses = await Class.find({sort: [{ 'createdAt': 'DESC' }]}).populate(['tutor', 'students']);
        return exits.success({
          code: 0,
          data: findClasses
        })
      }
      findClasses = await Class.find({ where: { tutor: id }, sort: [{ 'createdAt': 'DESC' }] }).populate(['tutor', 'students']);
      return exits.success({
        code: 0,
        data: findClasses
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
