module.exports = {


  friendlyName: 'Create comment',


  description: '',


  inputs: {
    id: {
      type: "number",
      description: "Id người đăng bình luận"
    },
    post: {
      type: "number",
      description: "Id bài đăng"
    },
    content: {
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
      let { id, post, content } = inputs
      let data = {
        commentBy: id,
        post,
        content
      }
      let createComment = await PostComment.create(data).fetch();
      await ActionLog.create({
        name: `Created comment ${content}`,
        user: id
      })
      return exits.success({
        code: 0,
        data: createComment,
        message: "Create comment success!"
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
