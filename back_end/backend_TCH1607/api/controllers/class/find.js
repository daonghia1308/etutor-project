module.exports = {


  friendlyName: 'Find',


  description: 'Find class.',


  inputs: {
    id: { type: 'number' },
    skip: { type: 'number' },
    limit: { type: 'number' },
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
      let data;
      let studentsName = [];
      let studentsId = [];
      let { id, skip, limit} = inputs;
      if (id) {
        let findClass = await Class.findOne(id);
        if (findClass.tutor != 0) {
          findClass.tutor = await User.findOne({id: findClass.tutor});
        }
        data = await User.find({ where: {id: findClass.students}, select: ['fullName'] });
        data.map((e) => {
          studentsName.push(e.fullName)
          studentsId.push(e.id)
        })
        findClass.studentsName = studentsName;
        findClass.students = studentsId;
        return exits.success({
          code: 0,
          data: findClass
        })
      }
      else {
        let findClasses = await Class.find().skip(skip).limit(limit);
        for (let i = 0; i < findClasses.length; i++) {
          if ( findClasses[i].tutor != 0) {
            findClasses[i].tutor = await User.findOne({id: findClasses[i].tutor})
          }
        }
        let total = await Class.count()
        return exits.success({
          code: 0,
          total,
          data: findClasses
        })
      }
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: 'System error!'
      })
    }
  }


};
