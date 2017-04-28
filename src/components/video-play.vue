<template>
  <div>
    <el-tabs v-model="tabs_active" type="card">
      <template v-for="(values, keys, indexs) in datvideo">
        <el-tab-pane :label="tran(keys)" :name="(indexs+1).toString()">
          <section class="tab_sect">
            <div class="nothing" v-if="values.length === 0">
              暂无数据或者您无权查看
            </div>
            <!-- 选项卡子项的条目 -->
            <ul class="tab">
              <li v-for="(val, index) in values" :class="{'on': tab_array[index]}" @click="tabSwitch(index)">
                <span v-text="tran(keys)+ '-' +(index + 1)"></span>
              </li>
            </ul>
            <!-- 选项卡子项条目的内容 -->
            <div class="tab_con">
              <div class="con" v-for="(val, index) in values" v-if="tab_array[index]">
                <video class="xh_video" controls :src="preUrl + val"></video>
              </div>
            </div>
          </section>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: {
    datvideo: null
  },
  data () {
    return {
      tabs_active: '1', // 选项卡位置绑定
      preUrl: process.env.API_ADDR + '/sfile/',
      tab_array: [true],
      tab_key: 0
    }
  },
  methods: {
    tran (keys) {
      return this.$task.translateElement(this, keys)
    },
    tabSwitch (key) {
      var arr = []
      arr[key] = true
      this.tab_key = key
      this.tab_array = arr
    }
  }
}
</script>
