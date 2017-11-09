let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Author = require('../models/author');

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/myblog');
mongoose.connection.on('connected', function () {
  console.log("mongodb connected success");
});
mongoose.connection.on('error', function () {
  console.log("mongodb connected fail");
});
mongoose.connection.on('disconnected', function () {
  console.log("mongodb disconnected");
});

//查询已发布文章
router.get('/articleListPub', (req, res, next) => {
  let authorModel = Author.findOne();
  authorModel.exec((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.msg
      });
    } else {
      var arr = doc.articleList.filter(function (item) {
        return item.status == 1
      });
      res.json({
        status: '0',
        msg: '',
        result: arr
      });
    }
  });
});

//检查是否登录
router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
});

//查询所有文章
router.get('/articleList', (req, res, next) => {
  let authorModel = Author.findOne();
  authorModel.exec((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.msg
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.articleList
      });
    }
  });
});

//登录
router.post('/login', function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };
  Author.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (doc) {
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        });
      } else {
        res.json({
          status: '1',
          msg: '账号密码错误',
          result: ''
        });
      }
    }
  });
});

//登出
router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: '0',
    msg: '',
    result: ''
  });
});

//编辑文章
router.post('/artEdit', (req, res, next) => {
  let userId = req.cookies.userId,
    createTime = req.body.createTime,
    title = req.body.title,
    content = req.body.content,
    status = req.body.status,
    lastSaveTime = req.body.lastSaveTime;
  Author.update({
    'userId': userId,
    'articleList.createTime': createTime
  }, {
    'articleList.$.title': title,
    'articleList.$.content': content,
    'articleList.$.status': status,
    'articleList.$.lastSaveTime': lastSaveTime,
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      });
    }
  });
});

//新增文章
router.post('/artAdd', (req, res, next) => {
  let userId = req.cookies.userId;
  let newArt = {
    "title": req.body.title,
    "createTime": req.body.createTime,
    "lastSaveTime": req.body.lastSaveTime,
    "content": req.body.content,
    "status": req.body.status
  };
  Author.findOne({
    userId: userId
  }, function (err, userDoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      userDoc.articleList.push(newArt);
      userDoc.save(function (err2, doc) {
        if (err2) {
          res.json({
            status: '1',
            msg: err2.message
          });
        } else {
          res.json({
            status: '0',
            msg: ''
          })
        }
      });
    }
  })
});

//删除文章
router.post('/artDel', (req, res, next) => {
  let userId = req.cookies.userId,
    createTime = req.body.createTime;
  Author.update({
    userId: userId
  }, {
    $pull: {
      'articleList': {
        'createTime': createTime
      }
    }
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  });
});

module.exports = router;
