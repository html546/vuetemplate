<template>
  <div>
    <!-- form -->
    <section class="photo_list" :class="cls">
      <header v-if="!hideheader">以下资料为图片资料，点击图片可以放大查看</header>
      <ul>
        <template v-for="(i, k, index) in datphoto">
          <template v-if="i.length > 1">
            <template v-if="judgeReturnData(k)">
              <li :title="translate(k)" v-for="(val, key) in i">
                <label class="photo_label" v-if="showchecked" @change="checkbox(k, index, $event)">
                  <input type="checkbox">
                  <div></div>
                </label>
                <i>
                  <img v-if="val !== null && val !== undefined" class="light-img" onerror="this.src='/static/image/error.png'"
                  :src="$task.getThumb(val, '150x150')" :alt="translate(k)" :data-src="$task.getBigImg(val)"
                  @click="showLightBox(val)">
                  <img v-else src="/static/image/nopic.png">
                </i>
                <span v-translate="k"></span>
              </li>
            </template>
            <template v-else>
              <li :title="translate(k)" v-for="(val, key) in i">
                <div v-if="showchecked" class="no_checked"></div>
                <i>
                  <img v-if="val !== null && val !== undefined" class="light-img" onerror="this.src='/static/image/error.png'"
                  :src="$task.getThumb(val, '150x150')" :alt="translate(k)" :data-src="$task.getBigImg(val)"
                  @click="showLightBox(val)">
                  <img v-else src="/static/image/nopic.png">
                </i>
                <span v-translate="k"></span>
              </li>
            </template>
          </template>
          <li v-if="i.length === 1" :title="translate(k)">
            <template v-if="judgeReturnData(k)">
              <label class="photo_label" v-if="showchecked" @change="checkbox(k, index, $event)">
                <input type="checkbox">
                <div></div>
              </label>
              <i>
                <img v-if="i[0] !== null && i[0] !== undefined" class="light-img" onerror="this.src='/static/image/error.png'"
                :src="$task.getThumb(i[0], '150x150')" :alt="translate(k)" :data-src="$task.getBigImg(i[0])"
                @click="showLightBox(i[0])">
                <img v-else src="/static/image/nopic.png">
              </i>
              <span v-translate="k"></span>
            </template>
            <template v-else>
              <div v-if="showchecked" class="no_checked"></div>
              <i>
                <img v-if="i[0] !== null && i[0] !== undefined" class="light-img" onerror="this.src='/static/image/error.png'"
                :src="$task.getThumb(i[0], '150x150')" :alt="translate(k)" :data-src="$task.getBigImg(i[0])"
                @click="showLightBox(i[0])">
                <img v-else src="/static/image/nopic.png">
              </i>
              <span v-translate="k"></span>
            </template>
          </li>
          <li v-if="i.length === 0">
            <i><img src="/static/image/nopic.png"></i>
            <span v-translate="k"></span>
          </li>
        </template>
      </ul>
    </section>
    <section v-if="light_box.show" class="light_box">
      <div class="arrow_left" @click="switchLightImg('left')" v-show="light_box.index !== 0"><i class="fa-angle-left"></i></div>
      <div class="arrow_right" @click="switchLightImg('right')" v-show="light_box.imgs_length - light_box.index !== 1"><i class="fa-angle-right"></i></div>
      <div class="light_box_con">
        <div class="light_box_close" @click="closeLightBox()"></div>
        <a :href="light_box.img" target="_blank">
          <div class="light_box_zoom"><i class="fa-search-plus"></i></div>
          <div class="light_box_address" v-if="light_box.address">
            <strong>拍摄地址：</strong>{{light_box.address}}
          </div>
          <img id="light_bigimg" :class="{'blur_img' : light_box.isblur}" @load="closeBlur();getImgExif()" :src="light_box.img" alt="">
          <!-- <img id="light_bigimg" :class="{'blur_img' : light_box.isblur}" @load="closeBlur();getImgExif()" src="/static/image/img.jpg" alt=""> -->
        </a>
        <span v-translate="light_box.name"></span>
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
    thetype: '', // 所属类型
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
        address: null,
        imgs_length: null,
        imgs: [],
        isblur: true
      }
    }
  },
  created () {
  },
  methods: {
    translate (val) {
      // alt翻译
      let translate = this.$translatefile.disk[val] ? this.$translatefile.disk[val] : val
      return translate
    },
    judgeReturnData (keys) {
      if (this.returndata === undefined || this.returndata === null || this.returndata.length === 0) {
        return true
      }
      if (this.returndata.length > 0) {
        for (let i = 0; i < this.returndata.length; i++) {
          if (this.returndata[i] === keys) {
            return false
          }
        }
        return true
      }
    },
    checkbox (key, index, event) {
      if (event.target.checked) {
        this.checkDatPhoto[index] = key
      } else {
        this.checkDatPhoto[index] = null
      }
      this.$emit('getCheck', this.checkDatPhoto) // 退回数组专用
      this.$parent.$emit('getCheck', this.checkDatPhoto) // 退回数组专用
      if (this.thetype !== '' && this.thetype !== null) {
        this.$emit('getCheckType', this.checkDatPhoto, this.thetype) // 退回对应类型及数组专用
        this.$parent.$emit('getCheckType', this.checkDatPhoto, this.thetype) // 退回对应类型及数组专用
      }
    },
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
      this.light_box.isblur = true
    },
    closeLightBox () {
      this.light_box = {
        show: false,
        name: '',
        img: '',
        index: null,
        address: null,
        imgs_length: null,
        imgs: [],
        isblur: true
      }
    },
    getImgName (url) {
      let arr = url.split('/')
      return arr[arr.length - 1]
    },
    closeBlur () {
      this.light_box.isblur = false
    },
    getImgExif () {
      let img = document.getElementById('light_bigimg')
      let v = this
      window.EXIF.getData(img, function () {
        let lon = window.EXIF.getTag(this, 'GPSLongitude')
        let lat = window.EXIF.getTag(this, 'GPSLatitude')
        if (lon !== undefined && lat !== undefined) {
          v.getAddress(v.gpsToNum(lon), v.gpsToNum(lat))
        }
      })
    },
    gpsToNum (str) {
      let a = (str + '').split(',')
      let a0 = +a[0]
      let a1 = +a[1] / 60
      let a2 = +a[2] / 3600
      return a0 + a1 + a2
    },
    getAddress (lon, lat) {
      let v = this
      var request = require('superagent')
      let url = '//restapi.amap.com/v3/geocode/regeo?key=389880a06e3f893ea46036f030c94700&location=' + lon + ',' + lat
      request('GET', url).type('text/plain').end(function (e, r) {
        if (r.body.status === '1') {
          v.light_box.address = r.body.regeocode.formatted_address
        }
      })
    }
  }
}
</script>
