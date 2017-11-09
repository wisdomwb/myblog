<template>
  <div class="nav-header">
    <div id="logo">
      <router-link href="javascript:;" to="/">
        <img class="logo" src="static/飞船.png" alt="logo">
      </router-link>
    </div>
    <span class="menu iconfont icon-HAMBURGERMENU" @click="showMobMenu=!showMobMenu"></span>
    <nav role="navigation" v-bind:class="{'click':showMobMenu}">
      <ul>
        <li>
          <router-link href="javascript:;" to="/">Home</router-link>
        </li>
        <li>
          <router-link href="javascript:;" to="/archive">Archive</router-link>
        </li>
        <li>
          <router-link href="javascript:;" to="/about">About</router-link>
        </li>
        <li>
          <router-link href="javascript:;" to="/manage">Manage</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style>

</style>
<script>
  import './../assets/css/navHeader.css'
  //  import Modal from 'Modal.vue'
  export default {
    data() {
      return {
        showMobMenu: false
      }
    },
    components: {},
    methods: {
      manage() {

      }
    }
  }
</script>
