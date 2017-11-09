<template>
  <div class="wrapper wrapper-manage">
    <div class="content">
      <nav-header></nav-header>
      <div class="content-inner">
        <div class="post">
          <!--<header class="post-header">-->
          <!--<h2 class="post-title">-->
          <!---->
          <!--</h2>-->
          <!--</header>-->
          <div class="user-info">
            <span v-if="isLogged" class="iconfont icon-xinjian" title="新建博客" @click="newBlog"></span>
            <span v-if="isLogged" @click="logout" class="iconfont icon-zhuxiao2" title="注销登录"></span>
            <span v-else @click="loginModalFlag=true" class="iconfont icon-denglu" title="登录"></span>
          </div>
          <table v-if="isLogged" class="archive">
            <tbody>
            <tr v-for="item in articles">
              <td>
                <!--<router-link href="javascript:;" :to="{path:'article',query:{createTime:item.createTime}}">{{item.title}}</router-link>-->
                <a href="javascript:;" style="cursor: default">{{item.title}}</a>
              </td>
              <td>
                <em>{{item.createTime | msToYMD}}</em>
              </td>
              <td>
                <em>{{item.status == 1 ? '已发布' : '草稿'}}</em>
              </td>
              <td>
                <em class="iconfont icon-edit" title="修改" @click="modBlog(item)"></em>
              </td>
              <td>
                <em class="iconfont icon-delete" title="删除" @click="delBlog(item)"></em>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <site-footer></site-footer>
    <!--<div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">登录</div>
          <button class="md-close" @click="loginModalFlag=false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginname" v-model="userName" placeholder="User Name"
                       data-type="loginname" class="regi_login_input regi_login_input_left">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" name="password" v-model="userPwd" placeholder="Password"
                       class="regi_login_input regi_login_input_left login-input-no input_text" @keyup.enter="login">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登  录</a>
          </div>
        </div>
      </div>
    </div>-->
    <div class="modal fade" tabindex="-1"  v-bind:class="{'show':loginModalFlag}" role="dialog">
      <!--<div class="modal-dialog" role="document">-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button"  @click="loginModalFlag=false" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">用户登录</h4>
          </div>
          <div class="modal-body">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <div class="form-group">
              <label for="name">名称</label>
              <input type="text" class="form-control" v-model="userName" id="name"
                     placeholder="请输入名称">
            </div>
            <div class="form-group">
              <label for="name">密码</label>
              <input type="password" class="form-control" v-model="userPwd" id="name"
                     placeholder="请输入名称" @keyup.enter="login">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal"  @click="login">登录</button>
          </div>
        </div><!-- /.modal-content -->
      <!--</div>&lt;!&ndash; /.modal-dialog &ndash;&gt;-->
    </div>
    <div class="md-overlay" v-if='loginModalFlag' @click="loginModalFlag=false"></div>
    <div class="lg-modal modal-msg lg-modal-transition" v-bind:class="{'lg-show':editModalFlag}">
      <div class="lg-modal-inner">
        <div class="lg-top">
          <button class="lg-close" @click="editModalFlag=false">Close</button>
          <!--<h4 class="lg-title">{{editStatus == 'new' ? '新建' : '修改'}}</h4>-->
          <input class="title" type="text" placeholder="请输入标题" v-model="curArticleTitle">
        </div>
        <div class="lg-content">
          <textarea placeholder="请输入内容" name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="lg-footer">
          <!--<a href="javascript:;" class="btn-login" @click="login">登  录</a>-->
          <button type="button" class="btn btn-default" @click="editModalFlag=false">关闭</button>
          <button type="button" class="btn btn-primary" @click="save('draft')">保存为草稿</button>
          <button type="button" class="btn btn-primary" @click="save('publish')">发布</button>
        </div>
      </div>
    </div>
    <div class="lg-overlay" v-if='editModalFlag' @click="editModalFlag=false"></div>
    <modal v-bind:mdShow="modalDelConfirm" v-on:close="closeModal">
      <p slot="message">
        <span>确认删除这篇博客？</span>
      <div slot="btnGroup">
        <button type="button" class="btn btn-default" @click="modalDelConfirm=false">关闭</button>
        <button type="button" class="btn btn-primary" @click="delBlogConfirm">确认</button>
      </div>
    </modal>
  </div>
</template>
<style>

</style>
<script>
  import '../assets/css/global.css'
  import './../assets/css/manage.css'
  import './../assets/css/modal.css'
  import './../assets/css/iconfont.css'
  import '../../node_modules/simplemde/dist/simplemde.min.css'
  import NavHeader from '../components/NavHeader.vue'
  import SiteFooter from '../components/SiteFooter.vue'
  import axios from 'axios'
  import SimpleMDE from 'simplemde'
  import Modal from '../components/Modal.vue'

  export default {
    data() {
      return {
        userName: '',
        userPwd: '',
        errorTip: false,
        isLogged: false,
        loginModalFlag: false,
        articles: [],
        editModalFlag: false,
        simplemde: null,
        editStatus: 'new',
        curArticle: null,
        curArticleTitle: '',//当前文章标题
        modalDelConfirm: false
      }
    },
    components: {
      NavHeader,
      SiteFooter,
      Modal
    },
    mounted: function () {
      this.checkLogin();
      this.simplemde = new SimpleMDE();
    },
    methods: {
      //检查是否登录
      checkLogin() {
        axios.get('/articles/checkLogin').then((response) => {
          let res = response.data;
          if (res.status == '0') {
            this.isLogged = true;
            this.getArticleList();
          } else {
            this.loginModalFlag = true;
            this.isLogged = false;
          }
        });
      },
      //获取文章列表
      getArticleList() {
        axios.get('/articles/articleList').then((response) => {
          var res = response.data;
          var arr = [];
          if (res.status == '0') {
            arr = res.result;
            this.articles = arr;
          }
        });
      },
      //登录
      login() {
        if (!this.userName || !this.userPwd) {
          this.errorTip = true;
          return;
        } else {
          axios.post('/articles/login', {
            userName: this.userName,
            userPwd: this.userPwd
          }).then((response) => {
            let res = response.data;
            if (res.status == '0') {
              this.errorTip = false;
              this.loginModalFlag = false;
              this.isLogged = true;
              this.getArticleList();
            } else {
              this.errorTip = true;
            }
          });
        }
      },
      //登出
      logout() {
        axios.post('/articles/logout').then((response) => {
          let res = response.data;
          if (res.status == '0') {
            this.isLogged = false;
          }
        })
      },
      //点击新建
      newBlog() {
        this.editStatus = 'new';
        this.curArticle = null;
        this.editModalFlag = true;
        this.curArticleTitle = '';
        this.simplemde.value('');
        if (!this.simplemde) {
//          this.simplemde = new SimpleMDE();
        }
      },
      //点击修改
      modBlog(item) {
//        this.simplemde = null;
        this.curArticle = item;
        this.curArticleTitle = item.title;
        this.editStatus = 'mod';
        this.editModalFlag = true;
        if (!this.simplemde) {
//          this.simplemde = new SimpleMDE();
        }
        this.simplemde.value(item.content);
      },
      //点击删除
      delBlog(item) {
        this.curArticle = item;
        this.modalDelConfirm = true;
      },
      //保存修改
      save(type) {
        let content = this.simplemde.value();
        let lastSaveTime = Date.now();
        let status = type == 'publish' ? 1 : 0;
        let title = this.curArticleTitle;
        console.log(title);
        let createTime;
        if (this.editStatus == 'mod') {
          createTime = this.curArticle.createTime;
          axios.post('/articles/artEdit', {
            content: content,
            lastSaveTime: lastSaveTime,
            status: status,
            title: title,
            createTime: createTime
          }).then((response) => {
            let res = response.data;
            if (res.status == '0') {
              this.editModalFlag = false;
              this.getArticleList();
            } else {
              alert('failure');
            }
          });
        } else {
          createTime = Date.now();
          axios.post('/articles/artAdd', {
            content: content,
            lastSaveTime: lastSaveTime,
            status: status,
            title: title,
            createTime: createTime
          }).then((response) => {
            let res = response.data;
            if (res.status == '0') {
              this.editModalFlag = false;
              this.getArticleList();
            } else {
              alert('add failure')
            }
          });
        }
      },
      //删除博客
      delBlogConfirm() {
        axios.post('/articles/artDel', {
          createTime: this.curArticle.createTime
        }).then((response) => {
          let res = response.data;
          if (res.status == 0) {
            this.modalDelConfirm = false;
            this.getArticleList();
          }
        });
      },
      //关闭删除提示弹窗
      closeModal() {
        this.modalDelConfirm = false;
      }
    }
  }
</script>
