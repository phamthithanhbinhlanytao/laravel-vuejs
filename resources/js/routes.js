import Vue from 'vue'
import VueRouter from 'vue-router'

import AddPost from './views/AddPost'
import Category from './views/Category'
import Post from './views/Post'
import SinglePost from './views/SinglePost'
import AllPost from './views/AllPost'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Post',
    path: '/',
    component: Post,
    meta: {
      layout: 'default'
    }
  },
  {
    name: 'Category',
    path: '/category/:id',
    component: Category,
    meta: {
      layout: 'default'
    }
  },
  {
    name: 'AddPost',
    path: '/add-post',
    component: AddPost,
    meta: {
      layout: 'default'
    }
  },
  {
    name: 'SinglePost',
    path: '/post/:id',
    component: SinglePost,
    meta: {
      layout: 'default'
    }
  },
  {
    name: 'Comment',
    path: '/post-comment/:id',
    component: SinglePost,
    meta: {
      layout: 'default'
    }
  },
  {
    name: 'Comments',
    path: '/comments/:id',
    component: SinglePost,
    meta: {
      layout: 'default'
    }
  },
  {
    name: 'AllPost',
    path: '/all-post',
    component: AllPost,
    meta: {
      layout: 'default'
    }
  },
  {
    name: 'DelTemporary',
    path: '/del-temporary/:id',
    component: AllPost,
    meta: {
      layout: 'default'
    }
  },
  {
    name: 'ViewData',
    path: '/view-data',
    component: AllPost,
    meta: {
      layout: 'default'
    }
  },
  {
    name: 'BackupData',
    path: '/back-up-data/:id',
    component: AllPost,
    meta: {
      layout: 'default'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})

router.beforeEach((to, from, next) => {
    next()
})

export default router