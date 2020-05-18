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
          message: 'Username, password must be filled!'
        })
      }
      let findUser = await User.findOne({username});
      if(!findUser) {
        return exits.fail({
          code: 1,
          message: 'User not exist!'
        })
      }
      let match = await sails.helpers.password.check.with({password, hashPassword: findUser.password});
      if(!match) {
        return exits.fail({
          code: 1,
          message: 'Wrong password!'
        })
      }
      delete findUser.password;
      delete findUser.username;
      let token = sails.helpers.jwt.sign(findUser)
      if(findUser.role == 3) {
        let findClass = await Class.findOne({students: findUser.id});
        if (findClass) {
          findUser.class = findClass.id
        }
        else {
          return exist.fail({
            code: 1,
            message: "Student didn't allocate for tutor!"
          })
        }
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
        message: 'System error!'
      }) 
    }
  }


};
