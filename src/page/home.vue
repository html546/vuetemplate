<template>
  <div>
    我叫首页<br>
    <el-button type="info" @click="$router.push('/components')" size="small">前往组件模块</el-button>
  </div>
</template>
<script>
export default {
  created () {
    console.log(this.$route)
  }
}
</script>
