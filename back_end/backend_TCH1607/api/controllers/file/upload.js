module.exports = {


  friendlyName: 'Upload',


  description: 'Upload file.',


  inputs: {
    fileName: {type: 'string'},
    serverFileName: {type: "string"},
    fileType: {type: "string"},
    size: {type: 'number'},
    status: {type: "string"},
    uploadBy: {type: 'number'}
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
      let {fileName, serverFileName, fileType, size, status, uploadBy } = inputs
      let data;
      let upload;
      if (fileType.includes("image") == true) {
        data = {
          fileName,
          serverFileName,
          fileType,
          size,
          status,
          field: "image",
          uploadBy
        }
        upload = await FileUpload.create(data).fetch();
        return exits.success({
          code: 0,
          data: upload
        })
      }
      else {
        data = {
          fileName,
          serverFileName,
          fileType,
          size,
          status,
          field: "file",
          uploadBy
        }
        upload = await FileUpload.create(data).fetch();
        return exits.success({
          code: 0,
          data: upload
        })
      }
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: "Hệ thống gặp vấn đề quay lại sau"
      })
    }
  }


};
