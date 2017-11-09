<template>
  <div class="wrapper wrapper-archive">
    <div class="content">
      <nav-header></nav-header>
      <div class="content-inner">
        <div class="post">
          <header class="post-header">
            <h2 class="post-title">
              Archive
            </h2>
          </header>
          <article class="post-content">
            <table class="archive">
              <tbody>
              <tr v-for="item in articles">
                <td>
                  <!--<router-link href="javascript:;" :to="{path:'article',query:{createTime:item.createTime}}">{{item.title}}</router-link>-->
                  <router-link href="javascript:;" :to="{path:`article/${item.createTime}`}">{{item.title}}</router-link>
                </td>
                <td>
                  <em>{{item.createTime | msToYMD}}</em>
                </td>
              </tr>
              </tbody>
            </table>
          </article>
        </div>
      </div>
    </div>
    <site-footer></site-footer>
  </div>
</template>
<style>

</style>
<script>
  import '../assets/css/global.css'
  import './../assets/css/article.css'
  import NavHeader from '../components/NavHeader.vue'
  import SiteFooter from '../components/SiteFooter.vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        articles: [],
        archive: [{
          title: "标题",
          createTime: 'Apr 1, 2017'
        }, {
          title: "标题",
          createTime: 'Apr 1, 2017'
        }, {
          title: "标题",
          createTime: 'Apr 1, 2017'
        }, {
          title: "标题",
          createTime: 'Apr 1, 2017'
        }, {
          title: "标题",
          createTime: 'Apr 1, 2017'
        }]
      }
    },
    components: {
      NavHeader,
      SiteFooter
    },
    mounted: function () {
      this.getList();
    },
    methods: {
      getList() {
        axios.get('/articles/articleListPub').then((result) => {
          var res = result.data;
          var arr = [];
          if (res.status == '0') {
            arr = res.result;
            this.articles = arr;
          }
        });
      },
    }
  }
</script>
