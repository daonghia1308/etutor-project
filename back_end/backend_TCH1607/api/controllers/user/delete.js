module.exports = {


  friendlyName: 'Delete',


  description: 'Delete user.',


  inputs: {
    id: {
      type: 'number'
    }
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
      let index;
      let { id } = inputs
      let findUser = await User.findOne(id)
      if (!findUser) {
        return exits.fail({
          code: 1,
          message: "Người dùng không tồn tại!"
        })
      }
      if (findUser.role == 2) {
        await User.destroy(id);
        await Class.update({ tutor: findUser.id }).set({ tutor: 0 });
      }
      if (findUser.role == 3) {
        await User.destroy(id);
        let findClass = await Class.find();
        findClass.map(async (c) => {
          if (c.students.includes(id)) {
            index = c.students.indexOf(id);
            c.students.splice(index, 1)
            await Class.update({ id: c.id }).set({ students: c.students });
          }
        })
      }
      return exits.success({
        code: 0,
        message: "Xóa người dùng thành công!"
      })

    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: 'Hệ thống gặp chút vấn đề, quay lại sau!'
      })
    }
  }


};
