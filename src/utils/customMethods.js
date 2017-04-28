var translateMethods = {
  'CUSTOMER_INFO': '客户信息',
  'ASSET_INFO': '资产信息',
  'AUDIT_INFO': '审核信息',
  'BIGDATA_INFO': '大数据信息',
  'LOANAFTER_INFO': '贷后信息',
  'FINANCE_INFO': '财务信息',
  'OTHER_INFO': '其他'
}
export default {
  translateMethods: translateMethods,
  getThumb (photo, size) {
    let arr = []
    arr = photo.split('/')
    let thumb = process.env.API_ADDR + '/sfile/'
    for (let i = 0; i < arr.length - 1; i++) {
      thumb += arr[i] + '/'
    }
    thumb += size + '/'
    thumb += arr.pop()
    return thumb
  },
  getBigImg (photo) {
    return process.env.API_ADDR + '/sfile/' + photo
  },
  getType (o) { // 判断类型
    switch (this.toType(o)) {
      case 'object': // 对象类型
        return 'obj'
      case 'null':
        return 'null'
      case 'undefined':
        return 'undefined'
      case 'array': // 数组类型
        return 'arr'
      case 'number': // 数组类型
        return 'num'
      default:
        return 'str' // 字符串类型
    }
  },
  judgeTypeReset (data, i) { // 判断类型进行重置清空数据:data-json数据或对象，i-是键值
    if (this.getType(data[i]) === 'arr') {
      data[i] = []
    } else if (this.getType(data[i]) === 'str') {
      data[i] = ''
    } else if (this.getType(data[i]) === 'obj') {
      for (var z in data[i]) {
        this.judgeTypeReset(data[i][z])
      }
    } else {}
  },
  getCnName (en) {
    // let disk = this.$task.disk
    for (var i in this.$translatefile.disk) {
      if (en === i) {
        return this.$translatefile.disk[i]
      }
    }
    return en
  },
  toType (obj) { // 字符串转换
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
  },
  // 翻译
  translate (self) {
    console.log(this.translateMethods[self])
    if (this.translateMethods[self]) {
      return this.translateMethods[self]
    } else {
      return self
    }
  },
  // 解析拥有的组件-返回数组
  analysisComponents (nameStr) {
    var specialKey = "[`~!#$^&*()（）=|{}':;',\\[\\].<>/?~！#￥……&*（）--——|{}【】‘；：”“'。，、？] -+‘'《》"
    for (var i = 0; i < specialKey.length; i++) {
      if (nameStr.indexOf(specialKey[i]) !== -1) {
        return nameStr.split(specialKey[i])
      }
    }
    return nameStr
  },
  judgeIsNullObj (obj) { // 判断对象是否为空
    for (var i in obj) { // 如果不为空，则会执行到这一步，返回true
      return true
    }
    return false // 如果为空,返回false
  },
  judgeIsPhoto (arrValue) { // 判断存储的是否为图片
    if (this.getType(arrValue) === 'str') { // 判断存储的是否为图片的路径---路径以字符串形式
      if (arrValue.indexOf('.') === -1) {
        return false
      }
      let arrSplit = arrValue.split('.')
      if (arrSplit[arrSplit.length - 1].toLowerCase() === 'jpg' || arrSplit[arrSplit.length - 1].toLowerCase() === 'png' || arrSplit[arrSplit.length - 1].toLowerCase() === 'jpeg' || arrSplit[arrSplit.length - 1].toLowerCase() === 'gif') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  judgeIsAudio (arrValue) { // 判断存储的是否为音频
    if (this.getType(arrValue) === 'str') { // 判断存储的是否为音频的路径---路径以字符串形式
      if (arrValue.indexOf('.') === -1) {
        return false
      }
      let arrSplit = arrValue.split('.')
      if (arrSplit[arrSplit.length - 1].toLowerCase() === 'mp3' || arrSplit[arrSplit.length - 1].toLowerCase() === 'wav' || arrSplit[arrSplit.length - 1].toLowerCase() === 'ogg' || arrSplit[arrSplit.length - 1].toLowerCase() === 'ape' || arrSplit[arrSplit.length - 1].toLowerCase() === 'm4a') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  judgeIsVideo (arrValue) { // 判断存储的是否为视频
    if (this.getType(arrValue) === 'str') { // 判断存储的是否为音频的路径---路径以字符串形式
      if (arrValue.indexOf('.') === -1) {
        return false
      }
      let arrSplit = arrValue.split('.')
      if (arrSplit[arrSplit.length - 1].toLowerCase() === 'mp4' || arrSplit[arrSplit.length - 1].toLowerCase() === 'avi' || arrSplit[arrSplit.length - 1].toLowerCase() === 'mov' || arrSplit[arrSplit.length - 1].toLowerCase() === 'rmvb' || arrSplit[arrSplit.length - 1].toLowerCase() === 'wmv' || arrSplit[arrSplit.length - 1].toLowerCase() === 'mkv') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  inputRemoveSpace (str) {
    // 去除输入框中的空格---str为字符串---
    var strArr = str.split(' ')
    var newStr = ''
    for (let i = 0; i < strArr.length; i++) {
      newStr = newStr + strArr[i]
    }
    return newStr
  },
  judgeIsDate (objValue) {
    // 判断对象的值是不是Date即日期类型
    if (objValue instanceof Date) { // 如果是，则会执行到这一步，返回true
      return true
    }
    return false // 如果不是,返回false
  },
  // 自定义正则表达式验证
  customRegExp (Regexp, value) {
    /*
      说明：customRegExp进行自定义正则表达式验证，参数：Regexp(必填)-正则表达式,value(必填)-要验证的内容
    */
    if (new RegExp(Regexp).test(value)) {
      return true
    }
    return false
  },
  validatorDateYYTM (dateObjValue) {
    // 判断是否符合YYYY-MM-DD模式的，如果是则返回true
    if (new RegExp(/^(\d{4})-(\d{2})-(\d{2})$/).test(dateObjValue)) {
      return true
    }
    return false // 如果不是,返回false
  },
  switchDateYYTM (dateObjValue) { // 时间转换为YYYY-TT-MM
    if (!dateObjValue) { return '-' }
    // 把Date对象的值转换为YYYY-MM-DD日期类型
    if ((new Date(dateObjValue).getMonth() + 1) < 10) {
      if (new Date(dateObjValue).getDate() < 10) {
        dateObjValue = new Date(dateObjValue).getFullYear() + '-0' + (new Date(dateObjValue).getMonth() + 1) + '-0' + new Date(dateObjValue).getDate()
      } else {
        dateObjValue = new Date(dateObjValue).getFullYear() + '-0' + (new Date(dateObjValue).getMonth() + 1) + '-' + new Date(dateObjValue).getDate()
      }
    } else {
      if (new Date(dateObjValue).getDate() < 10) {
        dateObjValue = new Date(dateObjValue).getFullYear() + '-' + (new Date(dateObjValue).getMonth() + 1) + '-0' + new Date(dateObjValue).getDate()
      } else {
        dateObjValue = new Date(dateObjValue).getFullYear() + '-' + (new Date(dateObjValue).getMonth() + 1) + '-' + new Date(dateObjValue).getDate()
      }
    }
    return dateObjValue
  },
  getTaskStatusCn (en) {
    let arr = [
      {cn: '退回待处理', en: 'RETURN_PROCESSED'},
      {cn: '拒绝', en: 'REFUSE'},
      {cn: '通过', en: 'PASSED'}
    ]
    for (var i = 0; i < 3; i++) {
      if (arr[i].en === en) {
        return arr[i].cn
      }
    }
    return '未知状态'
  }
}
