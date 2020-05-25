module.exports = {


  friendlyName: 'Create post',


  description: '',


  inputs: {
    id: {
      type: 'number',
      description: "Id người đăng bài"
    },
    content: {
      type: 'string'
    },
    files: {
      type: 'ref'
    },
    images: {
      type: 'ref'
    },
    class: {
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
      let {id, content, files, images} = inputs;
      let data = {
        postBy: id,
        content,
        files,
        images,
        class: inputs.class
      }
      await Post.create(data);
      await ActionLog.create({
        name: `Created post content ${content}`,
        user: id
      })
      return exits.success({
        code: 0,
        message: "Success!"
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
