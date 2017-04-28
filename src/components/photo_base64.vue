<template>
  <div>
    <!-- form -->
    <section class="photo_list" :class="cls">
      <header v-if="!hideheader">以下资料为图片资料，点击图片可以放大查看</header>
      <ul>
        <template v-for="(i, k) in datphoto">
          <li @click="showLightBox('data:image/png;base64,' + i)">
            <i><img class="base_img" :src="'data:image/png;base64,' + i" :alt="k"></i>
            <span v-translate="k"></span>
          </li>
        </template>
      </ul>
    </section>
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
export default {
  props: {
    datphoto: null,
    showchecked: false,
    hideheader: false,
    returndata: null,
    cls: null
  },
  data () {
    return {
      checkDatPhoto: [],
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
  },
  methods: {
    showLightBox (img) {
      let imgs = []
      let imgsDom = document.getElementsByClassName('base_img')
      let imgsDomLength = imgsDom.length
      this.light_box.imgs_length = imgsDomLength
      for (let i = 0; i < imgsDomLength; i++) {
        let obj = {
          src: imgsDom[i].src,
          alt: imgsDom[i].alt,
          index: i
        }
        if (this.getImgName(imgsDom[i].src) === this.getImgName(img)) {
          this.light_box.index = i
        }
        imgs.push(obj)
      }
      this.light_box.imgs = imgs
      console.log(this.light_box.imgs)
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
