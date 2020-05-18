module.exports = {


  friendlyName: 'Create meeting',


  description: '',


  inputs: {
    time: {type: "number"},
    classId: {type: "number"},
    title: {type: "string"}
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
      let {time, classId, title} = inputs;
      if(!time || !classId || !title) {
        return exits.fail({
          code: 1,
          message: "Time of meeting must be filled!"
        })
      }
      let findClass = await Class.findOne({id: classId}).populate('students')
      let meeting = {
        time,
        class: classId,
        title
      }
      let data = {
        time,
        email: findClass.students.email,
        fullName: findClass.students.fullName
      }
      await Meeting.create(meeting)
      await sails.helpers.sendMail(data);
      return exits.success({
        code: 0,
        message: "Send mail success"
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
