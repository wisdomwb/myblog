let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let authorSchema = new Schema({
  'userId': Number,
  'userName': String,
  'userPwd': String,
  "articleList": [{
    "title": String,
    "createTime": Number,
    "lastSaveTime": Number,
    "content": String,
    "status": Number
  }]
});

module.exports = mongoose.model('Author', authorSchema, 'authors');
