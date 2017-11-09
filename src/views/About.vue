<template>
  <div class="wrapper wrapper-about">
    <div class="content">
      <nav-header></nav-header>
      <div class="content-inner">
        <div class="post">
          <header class="post-header">
            <h2 class="post-title">
              Hello
            </h2>
          </header>
          <article class="post-content">
            <a class="github" target="_blank" href="https://github.com/wisdomwb">我的github主页</a>
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
  import '../assets/css/about.css'
  import NavHeader from '../components/NavHeader.vue'
  import SiteFooter from '../components/SiteFooter.vue'
  //  import axios from 'axios'
  export default {
    data() {
      return {
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
    }
  }
</script>
