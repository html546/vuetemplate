<template>
  <div>
    我是判断导航页，如果登录了就去首页，如果没登录就去登录页
    <el-button type="info" @click="$router.push('/login')" size="small">前往登录</el-button>
  </div>
</template>
<script>
export default {
  created () {
    this.initial()
  },
  methods: {
    initial () {
      if (window.localStorage.vuetemplatelogin !== undefined) {
        console.log('前往首页')
        this.$router.push('/home')
      }
    }
  }
}
</script>
