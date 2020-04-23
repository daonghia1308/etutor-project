module.exports = {


  friendlyName: 'Update',


  description: 'Update class.',


  inputs: {
    tutor: { type: 'number' },
    students: { type: 'ref' }
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
      let { students, tutor } = inputs
      let findClass = await Class.find({tutor: tutor});
      let findClassStudentId = findClass.map((e) => {return e.students});
      if (students.length > 0) {
        for (let i = 0; i < students.length; i++) {
          if (!findClassStudentId.includes(students[i])) {
            await Class.create({tutor: tutor, students: students[i]})
          }
          for (let j = 0; j < findClassStudentId.length; j++) {
            if (!students.includes(findClassStudentId[j])) {
              await Class.destroy({students: findClassStudentId[j]})
            }
          }
        }
        
      }
      else {
        await Class.destroy({tutor: tutor})
      }
      return exits.success({
        code: 0,
        message: 'Cập nhật lớp học thành công!'
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: 'Hệ thống gặp chút vấn đề quay lại sau!'
      })
    }
  }


};
