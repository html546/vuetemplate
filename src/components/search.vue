<template>
  <div>
    <!-- 组件使用方式： -->
    <!-- 说明：:nameShow="true"-姓名搜索开启，:searchBase="this.base_search"-获取搜索基础起始数据， :searchUpdate="this.base_search"-监听基础起始搜索数据的变化触发搜索更新
       @searchInfo="searchResult"-返回搜索的信息事件
       搜索开启可以匹配变量
    -->
    <!-- <custom-search :nameShow="true" :mobileShow="true" :searchBase="this.base_search" :searchUpdate="this.base_search" @searchInfo="searchResult"></custom-search> -->

    <!-- search model -->
    <el-form ref="search" :model="search">
      <div class="search_pro">
        <div v-if="this.nameShow" class="search_box">
          <span class="item">姓名</span>
          <el-input v-model="search.name"></el-input>
        </div>
        <div v-if="this.productNameShow" class="search_box">
          <span class="item">产品名称</span>
          <el-input v-model="search.product_name"></el-input>
        </div>
        <div v-if="this.storeNameShow" class="search_box">
          <span class="item">门店名称</span>
          <el-input v-model="search.store_name"></el-input>
        </div>
        <div v-if="this.companyNameShow" class="search_box">
          <span class="item">机构名称</span>
          <el-input v-model="search.company_name"></el-input>
        </div>
        <div v-if="this.mobileShow" class="search_box">
          <span class="item">手机号码</span>
          <el-input v-model="search.mobile"></el-input>
        </div>
        <div v-if="this.officePhoneShow" class="search_box">
          <span class="item">门店办公电话</span>
          <el-input v-model="search.office_phone"></el-input>
        </div>
        <div v-if="this.contactMobileShow" class="search_box">
          <span class="item">联系手机</span>
          <el-input v-model="search.contact_mobile"></el-input>
        </div>
        <div v-if="this.statusShow" class="search_box">
          <span class="item">状态</span>
          <el-select style="width: 120px" v-model="search_status_show" placeholder="请选择">
            <el-option v-for="(i, key) in this.asset_status" :label="i" :value="i" :key="i"></el-option>
          </el-select>
        </div>
        <div v-if="this.areaidShow" class="search_box">
          <span class="item">区域</span>
          <china-city :level="0" :max="3" :is_disabled="false" :cls="'input_city'" v-model="search.area_id"></china-city>
        </div>
        <div class="search_box">
          <el-button type="primary" @click="searchList">搜索</el-button>
          <el-button native-type="reset" @click="clearList">重置搜索</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    searchUpdate: null, // 搜索更新
    searchBase: null, // 搜索基础信息

    nameShow: false, // 是否显示姓名搜索
    mobileShow: false, // 是否显示手机搜索
    statusShow: false, // 是否显示状态搜索
    productNameShow: false, // 是否显示产品名称搜索
    storeNameShow: false, // 是否显示门店名称搜索
    officePhoneShow: false, // 是否显示门店办公电话搜索
    areaidShow: false, // 是否显示区域搜索
    companyNameShow: false, // 是否显示机构名称搜索
    contactMobileShow: false, // 是否显示联系手机搜索

    asset_status: {} // 状态搜索
  },
  data () {
    return {
      api: 'asset',
      search: {
        loan_status: null, // 加载状态
        name: null, // 姓名
        mobile: null, // 手机
        product_name: null, // 产品名称
        company_name: null, // 机构名称
        contact_mobile: null, // 联系手机
        area_id: null, // 区域
        status_show: null, // 状态
        office_phone: null // 门店办公电话
      },
      search_status_show: '' // 状态搜索-status_show
    }
  },
  watch: {
    searchUpdate: function () {
      // console.log(this.searchUpdate + '-----')
      this.clearAllSearch()
    }
  },
  methods: {
    searchList () {
      /*
        说明：重置-先清空this.search中所有为空的元素，再合并原始的数据和默认数据，触发searchInfo事件，传递搜索的数据
      */
      for (let i in this.search) {
        if (this.search[i] === null) {
          delete this.search[i]
        }
      }
      this.search = Object.assign(this.search, this.searchBase)
      // console.log('搜索')
      // console.log(this.search)
      this.$emit('searchInfo', this.search)
    },
    clearAllSearch () { // 还原初始
      for (let i in this.search) {
        this.search[i] = null
      }
    },
    clearList () { // 重置
      /*
        说明：重置-触发searchInfo事件，传递默认原始的数据
      */
      this.clearAllSearch()
      // console.log('重置')
      // console.log(this.searchBase)
      this.$emit('searchInfo', this.searchBase) // 重置
    }
  }
}
</script>
