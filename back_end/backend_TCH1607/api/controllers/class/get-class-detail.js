const moment = require('moment')
module.exports = {


  friendlyName: 'Get post',


  description: '',


  inputs: {
    class: {
      type: "number"
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
      let findClass = await Class.findOne({ id: inputs.class });
      findClass.tutor = await User.findOne({ id: findClass.tutor });
      findClass.students = await User.findOne({ id: findClass.students });
      let findPosts = await Post.find({ class: findClass.id }).sort('createdAt DESC');
      if (findPosts.length > 0) {
        for (let i = 0; i < findPosts.length; i++) {
          findPosts[i].comment = await PostComment.find({ post: findPosts[i].id }).sort('createdAt ASC');
          if (findPosts[i].comment.length > 0) {
            for (let j = 0; j < findPosts[i].comment.length; j++) {
              findPosts[i].comment[j].createdAt = moment(findPosts[i].comment[j].createdAt).fromNow()
              findPosts[i].comment[j].commentBy = await User.findOne({ id: findPosts[i].comment[j].commentBy })
            }
          }
          findPosts[i].files = await FileUpload.find({ id: findPosts[i].files }).sort('createdAt DESC');
          findPosts[i].images = await FileUpload.find({ id: findPosts[i].images }).sort('createdAt DESC');
          findPosts[i].postBy = await User.findOne({ id: findPosts[i].postBy })
        }
      }
      let data = {
        class: findClass,
        posts: findPosts ? findPosts : []
      }
      return exits.success({
        code: 0,
        data
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
