/**
 * FileUpload.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const path = require('path');

module.exports = {
  dir: {
    images: path.join(__dirname, '../../upload/images'),
    other: path.join(__dirname, '../../upload/other'),
    upload: path.join(__dirname, '../../upload'),
  },
  getFilePath: function (fileUpload) {
    let filePath = path.join(FileUpload.dir[fileUpload.serverFileDir], fileUpload.serverFileName);
    return filePath;
  },
  isImage: function (fileUpload) {
    if (fileUpload && fileUpload.fileType) {
      return fileUpload.fileType.toLowerCase().includes('image');
    } else {
      return false;
    }
  },
  getLinkImage: function (fileUpload) {
    if (!FileUpload.isImage(fileUpload)) {
      return {
        status: false,
        url: ''
      };
    }
    return {
      status: true,
      url: process.env.NODE_ENV === "production" ? 'https://etutor-project.herokuapp.com/' : 'http://localhost:1337/' + fileUpload.serverFileName  
    };
  },
  attributes: {
    fileName: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    serverFileDir: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    serverFileName: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    fileType: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    size: {
      type: 'number',
    },
    status: {
      type: 'string'
    },
    field: {
      type: 'string'
    }
  },
  customToJSON: function () {
    let link = FileUpload.getLinkImage(this);
    if (link.status && this.serverFileDir === 'images') {
      this.url = link.url;
    }
    return this;
  },
};
