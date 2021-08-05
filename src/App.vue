<template>
  <div id="app">
	  <keep-alive exclude="Detail">
		  <router-view></router-view>
	  </keep-alive>
      <main-tab-bar class="main-tab-bar"/>
  </div>
</template>
<script>

  import MainTabBar from './components/content/mainTabBar/MainTabBar.vue'

	export default {
		name:'app',
		components:{
      MainTabBar
		}
	}
</script>
<style>
	@import url("assets/css/base.css");
	
	.main-tab-bar {
		position: relative;
		z-index: 8;
	}
</style>
