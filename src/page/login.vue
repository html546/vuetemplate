<template>
  <div class="login_html">
    <section class="login_box">
      <dl>
        <dd><input type="text" placeholder="用户名" maxlength="11" v-model="dat.account" class="username" /></dd>
        <dd><input type="password" placeholder="密码" maxlength="16" v-model="dat.password" class="password" /></dd>
        <dd>
          <input type="text" placeholder="验证码" maxlength="4" id="captcha" v-model="dat.captcha" @keyup.enter="login" class="captcha">
          <img :src="captcha" class="captcha_img">
        </dd>
        <dt><input type="button" @click="login" class="submit" value="登录后台" /></dt>
      </dl>
    </section>
    <footer class="login_copy">版权所有</footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dat: {
        account: '',
        password: ''
      },
      captcha: ''
    }
  },
  created () {
    // window.onunload = function () { // 关闭页面时或刷新时，删除当前页存储
    //   window.localStorage.removeItem('vuetemplatelogin')
    // }
  },
  methods: {
    login: function () {
      console.log(this.dat)
      if (this.dat.account === 'yanmo' && this.dat.password === '123') {
        window.localStorage.vuetemplatelogin = this.dat
        this.$router.push('/')
      } else {
        this.$alert('帐号或密码错误', '提示', {type: 'error'})
      }
    }
  }
}
</script>
