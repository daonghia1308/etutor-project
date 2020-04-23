module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {
    username: {type: 'string'},
    password: {type: 'string'},
    fullName: {type: 'string'},
    phone: {type: 'string'},
    email: {type: 'string'},
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
      let {username, password, fullName, phone, email, role} = inputs;
      if(!username || !password || !fullName || !phone || !email || !role) {
        return exits.fail({
          code: 1,
          message: "Cần nhập đủ dữ liệu để tạo người dùng!"
        })
      }
      let findUser = await User.findOne({username: username});
      if(findUser) {
        return exits.fail({
          code: 1,
          message: "Username đã tồn tại!"
        })
      }
      let findUserEmail = await User.findOne({email: email});
      if(findUserEmail) {
        return exits.fail({
          code: 1,
          message: "Email đã tồn tại!"
        })
      }
      password = await sails.helpers.password.hash(password);
      let data = {
        username,
        password,
        fullName,
        phone,
        email,
        role
      }
      await User.create(data);
      return exits.success({
        code: 0,
        message: "Tạo người dùng thành công!"
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: "Hệ thống gặp chút vấn đề, quay lại sau!"
      })
    }
  }


};
