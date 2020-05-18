module.exports = {


  friendlyName: 'Get user detail',


  description: '',


  inputs: {
    id: { type: "number" }
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
      let studentsName = [];
      let students = []
      let findStudent;
      let findUser = await User.findOne({ id: id });
      if (findUser.role == 2) {
        let findClass = await Class.find({ tutor: findUser.id })
        for (let i = 0; i < findClass.length; i++) {
          findStudent = await User.findOne({ id: findClass[i].students })
          studentsName.push(findStudent.fullName)
          students.push(findStudent.id)
        }
        findUser.studentsName = studentsName
        findUser.students = students
      }
      return exits.success({
        code: 0,
        data: findUser
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
