<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"> <slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>

    <div :style="activeStyle" ><slot name="item-text"></slot></div>

  </div>

</template>

<script>
  export default{
    name:"TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'#d81e06'
      }
    },
    data() {
      return {
        // isActive:true
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
        // return this.$route.path ==this.path
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor}:{}
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path).catch((err)=>{err})
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    /* 移动端tab-bar 一般为49px */
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    margin-top: 3px ;
    width: 24;
    height: 24px;
    vertical-align: middle;
  }

</style>
