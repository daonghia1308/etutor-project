module.exports = {


  friendlyName: 'Login',


  description: 'Login auth.',


  inputs: {
    username: {
      type: 'string'
    },
    password: {
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
      let {username, password} = inputs;
      if(!username || !password) {
        return exits.fail({
          code: 1,
          message: 'Username, password không được để trống!'
        })
      }
      let findUser = await User.findOne({username});
      if(!findUser) {
        return exits.fail({
          code: 1,
          message: 'Người dùng không tồn tại!'
        })
      }
      let match = await sails.helpers.password.check.with({password, hashPassword: findUser.password});
      if(!match) {
        return exits.fail({
          code: 1,
          message: 'Sai thông tin đăng nhập!'
        })
      }
      delete findUser.password;
      delete findUser.username;
      let token = sails.helpers.jwt.sign(findUser)
      if(findUser.role == 3) {
        let findClass = await Class.findOne({students: findUser.id});
        findUser.class = findClass.id
      }
      return exits.success({
        code: 0,
        data: findUser,
        token
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
