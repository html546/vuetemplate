<template>
  <div>
    <!-- top -->
    <section class="admin_tool">
      <div class="admin_tool_btn">
        <el-button size="small" @click="$router.go(-1)">
          <span>返回</span>
        </el-button>
      </div>
      <div class="admin_location">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>组件</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </section>

    <!-- 组件 -->
    <h3>局部组件：</h3>
    <my-component></my-component>
    <h3>data 必须是函数：</h3>
    <simple-counter></simple-counter>
    <simple-counter></simple-counter>
    <simple-counter></simple-counter>
    <h3>父子组件的交互:</h3>
    <child message="HELLO!" :my-message="this.message" :number="11" v-on:onchild="inparent" :foo.sync="bar"></child>
    <el-button size="small" v-on:click="bar++">改变bar</el-button>
  </div>
</template>
<script>
var vuecomponent = {
  template: '<div>A custom component!</div>'
}
import child from './child.vue'
export default {
  components: {
    child: child,
    'my-component': vuecomponent,
    'simple-counter': {
      template: '<el-button size="small" v-on:click="counter += 1">{{ counter }}</el-button>',
      // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
      // 但是我们返回给每个组件的实例的却引用了同一个data对象
      data: function () {
        return {counter: 0}
      }
    }
  },
  data () {
    return {
      message: '你猜',
      bar: 1
    }
  },
  watch: {
    bar: function () {
      console.log(this.bar)
    }
  },
  methods: {
    inparent (childs, childrens) {
      alert('父组件响应了')
      console.log(childs)
      console.log(childrens)
    }
  }
}
</script>
