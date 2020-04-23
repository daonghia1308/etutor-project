module.exports = {


  friendlyName: 'Sign up',


  description: 'Api đăng kí',


  inputs: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    fullName: {
      type: 'string'
    },
    email: {
      type: 'string'
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
      let { username, password, fullName, email } = inputs;
      if (!username || !password || !fullName || !email) {
        return exits.fail({
          code: 1,
          message: 'Cần điền đủ dữ liệu để tạo tài khoản!'
        })
      }
      let findUserName = await User.findOne({username: username});
      if (findUserName) {
        return exits.fail({
          code: 1,
          message: 'Tên đăng nhập đã tồn tại!'
        })
      }
      let hashPassword = await sails.helpers.password.hash(password);
      let user = {
        username,
        password: hashPassword,
        fullName,
        email
      }
      await User.create(user);
      return exits.success({
        code: 0,
        message: 'Thêm tài khoản thành công!'
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
