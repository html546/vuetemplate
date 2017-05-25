import frame from '../frame/frame.vue'
const Foo = { template: '<router-view></router-view>' }
import index from '../page/index.vue'
import home from '../page/home.vue'
import login from '../page/login.vue'
// 入门
import introduction from '../page/introduction/index.vue'
import introductionDetails from '../page/introduction/details.vue'
import introductionDetailspage from '../page/introduction/detailspage/detailspage.vue'

// 进阶
import advanced from '../page/advanced/index.vue'
import advancedDetails from '../page/advanced/details.vue'
import advancedDetailspage from '../page/advanced/detailspage/detailspage.vue'

// 组件系列
import components from '../page/components/index.vue'

// 配置路由
export default [
  {
    path: '/',
    component: index
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/introduction',
    // component: Foo,
    component: frame,
    children: [
      {path: '', component: introduction},
      {path: 'details', component: introductionDetails},
      {path: 'detailspage', component: introductionDetailspage}
    ]
  },
  {
    path: '/advanced',
    component: frame,
    children: [
      {path: '', component: advanced},
      {path: 'details', component: advancedDetails},
      {path: 'detailspage', component: advancedDetailspage}
    ]
  },
  {
    path: '/components',
    component: Foo,
    children: [
      {path: '', component: components}
    ]
  }
]
