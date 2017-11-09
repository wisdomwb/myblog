<template>
  <div class="wrapper wrapper-home">
    <div class="content">
      <nav-header></nav-header>
      <div class="content-inner">
        <div class="home">
          <div class="post-full" v-for="item in articles">
            <div class="post">
              <header>
                <p class="date">{{item.createTime | msToYMD}}</p>
                <h2>
                  <router-link href="javascript:;" :to="{path:`article/${item.createTime}`}">{{item.title}}</router-link>
                </h2>
              </header>
              <div class="post-content drop" v-html="item.content">
              </div>
              <div class="details"><router-link  title="详细" href="javascript:;" :to="{path:`article/${item.createTime}`}">>></router-link></div>
            </div>
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
  import '../assets/css/global.css'
  import '../assets/css/home.css'
  import NavHeader from '../components/NavHeader.vue'
  import SiteFooter from '../components/SiteFooter.vue'
  import axios from 'axios'
  import marked from 'marked'

  export default {
    data() {
      return {
        articles: []
      }
    },
//    filters:{
//      marked
//    },
    components: {
      NavHeader,
      SiteFooter
    },
    mounted: function () {
      this.getList();
    },
    methods: {
      getList() {
        let self = this;
        axios.get('/articles/articleListPub').then((result) => {
          var res = result.data;
          var arr = [];
          if (res.status == '0') {
            arr = res.result;
            arr.forEach(function(item){
              item.content=self.getPlainText(marked(item.content));
            });
            this.articles=arr;
          }
        });
      },
      //抽取html中的text
      getPlainText(htmlStr){
        let textComplete = htmlStr.replace(/<[^>]+>/g,'');
        let textBrief = textComplete.slice(0, 120)+'......';
        return textBrief;
      }
    }
  }
</script>
