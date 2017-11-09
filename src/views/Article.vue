<template>
  <div class="wrapper wrapper-article">
    <div class="content">
      <nav-header></nav-header>
      <div class="content-inner">
        <div class="post">
          <header class="post-header">
            <h2 class="post-title">
              {{article.title}}
            </h2>
          </header>
          <div class="post-content" v-html="article.content">
          </div>
        </div>
      </div>
    </div>
    <site-footer></site-footer>
  </div>
</template>
<style>

</style>
<script>
  import "../assets/css/global.css";
  import "./../assets/css/article.css";
//  import '../../node_modules/simplemde/dist/simplemde.min.css'
  import NavHeader from "../components/NavHeader.vue";
  import SiteFooter from "../components/SiteFooter.vue";
  import axios from "axios";
  import marked from "marked";

  export default {
    data() {
      return {
        article: {}
      };
    },
    components: {
      NavHeader,
      SiteFooter
    },
    mounted: function () {
      this.getArticle();
    },
    methods: {
      getArticle() {
        var self = this;
        axios.get("/articles/articleListPub").then(result => {
          var res = result.data;
          var arr = [];
          if (res.status == "0") {
            arr = res.result.filter(function (item) {
              return item.createTime == self.$route.params.createTime;
            })
            arr[0].content = marked(arr[0].content);
            this.article = arr[0];
          }
        });
      }
    }
  };
</script>
