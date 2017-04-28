<template>
  <div class="upfiles" :class="cls">
    <div class="preimg" v-if="imgUrl.length !== 0">
      <ul>
        <li v-for="(i,k) in imgUrl">
          <img class="light-img" :src="$task.getThumb(i,'150x150')" :data-src="preUrl + i" @click="showLightBox(i)">
          <del @click="delFile(k, i)">删除</del>
        </li>
      </ul>
    </div>
    <div class="preaudio" v-if="audio.length !== 0">
      <ul>
        <li v-for="(i,k) in audio">
          <audio controls :id="'audio' + k" :src="preUrl + i"></audio>
          <del @click="delFile(k, i)">删除</del>
        </li>
      </ul>
    </div>
    <div class="prevideo" v-if="video.length !== 0">
      <ul>
        <li v-for="(i,k) in video">
          <video controls :id="'video' + k" :src="preUrl + i"></video>
          <del @click="delFile(k, i)">删除</del>
        </li>
      </ul>
    </div>
    <el-upload
      :action="uploadUrl"
      :data="{type:type}"
      :with-credentials="true"
      :show-file-list="showfilelist"
      :multiple="true" :accept="acceptName"
      :on-success="data => {upFile(data)}">
      <el-button size="small">
        <i class="fa-upload"></i>
        <span>点击上传</span>
        <span v-if="type === 1">图片</span>
        <span v-if="type === 2">录音文件</span>
        <span v-if="type === 3">视频文件</span>
      </el-button>
    </el-upload>
    <span class="uploadtitle" v-if="title" v-text="'提示：' + title"></span>
    <hr class="upfile_hr">
    <!-- <div v-else>出错啦！</div> -->
    <section v-if="light_box.show" class="light_box">
      <div class="arrow_left" @click="switchLightImg('left')" v-show="light_box.index !== 0"><i class="fa-angle-left"></i></div>
      <div class="arrow_right" @click="switchLightImg('right')" v-show="light_box.imgs_length - light_box.index !== 1"><i class="fa-angle-right"></i></div>
      <div class="light_box_con">
        <a :href="light_box.img" target="_blank"><img :src="light_box.img" alt=""></a>
        <span v-translate="light_box.name"></span>
        <div class="light_box_help">
          <i class="fa-question-circle"></i>
          <p>点击背景关闭大图，点击大图，在新窗口查看更大的图片</p>
        </div>
      </div>
      <div class="light_box_bg" @click="closeLightBox()"></div>
    </section>
  </div>
</template>
<script>
// 说明:图片的类型是——1、音频的类型是——2
export default {
  props: {
    value: {type: Array},
    type: null,
    name: '',
    title: null,
    acceptName: '',
    showfilelist: true, // 控制是否显示已上传文件列表
    cls: null
  },
  data () {
    return {
      uploadUrl: process.env.API_ADDR + '/upload',
      preUrl: process.env.API_ADDR + '/sfile/',
      imgUrl: [],
      audio: [],
      video: [],
      light_box: {
        show: false,
        name: '',
        img: '',
        index: null,
        imgs_length: null,
        imgs: []
      }
    }
  },
  created () {
    if (this.value !== undefined) {
      if (this.$task.judgeIsPhoto(this.value[0])) {
        this.imgUrl = this.value
      } else if (this.$task.judgeIsAudio(this.value[0])) {
        this.audio = this.value
      } else if (this.$task.judgeIsVideo(this.value[0])) {
        this.video = this.value
      } else {}
    }
  },
  watch: {
    value: function () { // 加载时，用于赋值显示
      if (this.value !== undefined) {
        if (this.$task.judgeIsPhoto(this.value[0])) {
          this.imgUrl = this.value
        } else if (this.$task.judgeIsAudio(this.value[0])) {
          this.audio = this.value
        } else if (this.$task.judgeIsVideo(this.value[0])) {
          this.video = this.value
        } else {}
      }
    }
  },
  methods: {
    // imgError (i, event) {
    //   event.target.src = this.preUrl + i + '?' + new Date().getTime()
    // },
    upFile (r) { // 上传文件
      if (this.$task.judgeIsPhoto(r.data.url)) { // 判断上传文件是否为图片
        if (this.type === 1) { // 判断上传组件类型是否为图片类型
          this.imgUrl.push(r.data.url)
          this.$emit('input', this.imgUrl)
        } else {
          this.$message('您没有添加图片的权限')
          return
        }
      } else if (this.$task.judgeIsAudio(r.data.url)) { // 判断上传文件是否为音频
        if (this.type === 2) { // 判断上传组件类型是否为音频类型
          this.audio.push(r.data.url)
          this.$emit('input', this.audio)
        } else {
          this.$message('您没有添加音频的权限')
          return
        }
      } else if (this.$task.judgeIsVideo(r.data.url)) { // 判断上传文件是否为音频
        if (this.type === 3) { // 判断上传组件类型是否为音频类型
          this.video.push(r.data.url)
          this.$emit('input', this.video)
        } else {
          this.$message('您没有添加视频的权限')
          return
        }
      } else {
        this.$message('您没有添加该文件的权限')
        return
      }
    },
    delFile (k, value) { // 删除上传文件
      if (this.$task.judgeIsPhoto(value)) { // 判断要删除的上传文件是否为图片
        this.imgUrl.splice(k, 1)
        this.$emit('input', this.imgUrl)
      } else if (this.$task.judgeIsAudio(value)) { // 判断要删除的上传文件是否为音频
        this.audio.splice(k, 1)
        this.$emit('input', this.audio)
      } else if (this.$task.judgeIsVideo(value)) { // 判断要删除的上传文件是否为音频
        this.video.splice(k, 1)
        this.$emit('input', this.video)
      } else {}
    },
    // 图片显示
    showLightBox (img) {
      let imgs = []
      let imgsDom = document.getElementsByClassName('light-img')
      let imgsDomLength = imgsDom.length
      this.light_box.imgs_length = imgsDomLength
      for (let i = 0; i < imgsDomLength; i++) {
        let obj = {
          src: imgsDom[i].dataset.src,
          alt: imgsDom[i].alt,
          index: i
        }
        if (this.getImgName(imgsDom[i].src) === this.getImgName(img)) {
          this.light_box.index = i
        }
        imgs.push(obj)
      }
      this.light_box.imgs = imgs
      this.showLightImg(this.light_box.index)
    },
    switchLightImg (arrow) {
      let i = this.light_box.index
      arrow === 'left' ? i-- : i++
      this.light_box.index = i
      this.showLightImg(i)
    },
    showLightImg (index) {
      let img = this.light_box.imgs[index].src
      let name = this.light_box.imgs[index].alt
      this.light_box.img = img
      this.light_box.name = name
      this.light_box.show = true
    },
    closeLightBox () {
      this.light_box.show = false
    },
    getImgName (url) {
      let arr = url.split('/')
      return arr[arr.length - 1]
    }
  }
}
</script>
