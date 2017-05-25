<template>
  <div>
    <div>{{message}}</div>
    <div v-text="myMessage"></div>
    <h3>需要修改props方法</h3>
    <div>{{counter}}</div>
    <div>{{messagetoLowerCase}}</div>
    <el-button size="small" v-on:click="onparent">父组件响应吧！！！</el-button>
    <div>{{foo}}</div>
    <el-button size="small" v-on:click="onsync">改变foo</el-button>
  </div>
</template>

<script>
export default {
  // el: '',
  name: '',
  props: {
    message: String,
    foo: null,
    myMessage: {
      type: String,
      required: true
    },
    number: {
      validator: function (value) {
        return value > 10
      }
    }
  }, // 父到子传参
  components: {}, // 组件接收
  mixins: [], // 混合
  data () { // 基础数据
    return {
      //
      counter: this.message,
      childs: '我是孩子的值',
      childrens: '我是孩子的另一个值'
    }
  },
  created () {}, // 创建周期
  watch: {}, // 状态过渡
  methods: {
    onparent () {
      this.$emit('onchild', this.childs, this.childrens)
    },
    onsync () {
      this.$emit('update:foo', this.foo + 1)
    }
  }, // 方法存放的地方
  computed: {
    messagetoLowerCase: function () {
      return this.message.trim().toLowerCase()
    }
  }, // 计算属性存放的地方
  filters: {}, // 过滤
  directives: {} // 指令
}
</script>
