module.exports = {


  friendlyName: 'Statistic',


  description: 'Statistic something.',


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
      let findClasses = await Class.find();
      let findTutors = await User.find({role: 2});
      let findStudents = await User.find({role: 3});
      let data = {
        findClasses: findClasses.length,
        findTutors: findTutors.length,
        findStudents: findStudents.length
      }
      return exits.success({
        code: 0,
        data
      }) 
    } catch (error) {
      return exits.serverError({
        code: 1,
        message: error.message
      })
    }
  }


};
