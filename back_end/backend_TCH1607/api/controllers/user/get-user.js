module.exports = {


  friendlyName: 'Get user',


  description: '',


  inputs: {
    id: { type: 'number' },
    skip: { type: 'number' },
    limit: { type: 'number' },
    role: {type: 'number'}
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
      let { id, skip, limit, role } = inputs;
      let findStudentNotAssigned = []
      if (id) {
        let findUser = await User.findOne({id: id}).populate('role');
        delete findUser.password;
        if (findUser) {
          return exits.success({
            code: 0,
            data: findUser
          })
        }
        else {
          return exits.fail({
            code: 1,
            message: 'Không tìm thấy người dùng!'
          })
        }
      }
      if(role == 2) {
        let findTutors = await User.find({role}).skip(skip).limit(limit);
        let total = await User.find({role});
        return exits.success({
          code: 0,
          data: findTutors,
          total: total.length
        })
      }
      if (role == 3) {
        let findStudent = await User.find({role}).skip(skip).limit(limit);
        for (let i = 0; i < findStudent.length; i++) {
          let findClass = await Class.findOne({students: findStudent[i].id})
          if (!findClass) {
            findStudentNotAssigned.push(findStudent[i])
          }
        }
        let total = await User.find({role});
        return exits.success({
          code: 0,
          data: findStudentNotAssigned,
          total: total.length
        })
      }
      else {
        let findUsers = await User.find({ select: ['id', 'username', 'fullName','phone', 'email', 'role'] }).skip(skip).limit(limit).populate('role')
        findUsers.map((u) => {
          u.role = u.role.name
        })
        let total = await User.count();
        return exits.success({
          code: 0,
          data: findUsers,
          total
        })
      }
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: 'Hệ thống gặp vấn đề, quay lại sau!'
      })
    }
  }


};
