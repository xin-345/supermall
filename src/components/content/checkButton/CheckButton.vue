  
<template>
  <div class='check-button' >
    <div v-if='isChecked'>
      <img src="~assets/img/cart/select.svg" alt="">
    </div>
    <div v-else>
      <img src="~assets/img/cart/unselect.svg" alt="" >
    </div>

  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>
.check-button img{
  width: 22px;
}
</style>