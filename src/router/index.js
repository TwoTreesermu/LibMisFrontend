import { createRouter, createWebHistory } from 'vue-router'
import BookManage from "@/views/manager/BookManage.vue";
import UserManage from "@/views/manager/UserManage.vue";
import NotificationManage from "@/views/manager/NotificationManage.vue";
import ReservationManage from "@/views/manager/ReservationManage.vue";
import BorrowManage from "@/views/manager/BorrowManage.vue";
import AdministratorManage from "@/views/manager/AdministratorManage.vue";


const routes = [
  {
    path: "/", redirect: "/login",
  },
  {  // 登录页面
    path: "/login", name:"Login", component: () => import("../views/Login.vue"),
    meta: {title:'登录系统'}
  },
  {
    path: "/register", name:"Register", component: () => import("../views/Register.vue"),
    meta: {title: '欢迎注册'}
  },
  {  // 用户页面
    path:"/user", name: "User", component: () => import("../views/User.vue"),
    meta: {title: '用户首页'},
    children: [
      { // 用户可视化首页
        path: "home", name: "Home", component: () => import("../views/user/Home.vue"),
      },
      { // 图书详情页
        path: "bookDetail", name: "BookDetail", component: () => import("../views/user/BookDetail.vue"),
      }
    ]
  },
  { // 管理员页面
    path: '/manager', name: 'Manager', component: () => import("../views/Manager.vue"),
    meta: {title: '管理员首页'},
    children: [
      { // 管理员可视化首页
        path: "homePage", name: "HomePage", component: () => import("../views/manager/HomePage.vue"),
      },
      {  // 图书分类
        path: 'bookCategory', name: 'BookCategoryManage', component: () => import("../views/manager/BookCategoryManage.vue"),
        meta: {title: '图书分类管理'}
      },
      {  // 图书信息
        path: 'book', name: 'BookManage', component: BookManage,
        meta: {title: '图书管理'}
      },
      { // 用户信息
        path: 'user', name: 'UserManage', component: UserManage,
        meta: {title: '用户信息'}
      },
      { // 通知
        path: 'notification', name: 'NotificationManage', component: NotificationManage,
        meta: {title: '通知管理'}
      },
      { // 预约
        path: 'reservation', name: 'ReservationManage', component: ReservationManage,
        meta: {title: '预约管理'}
      },
      { // 借阅
        path: 'borrow', name: 'BorrowManage', component: BorrowManage,
        meta: {title: '借阅管理'}
      },
      { // 管理员信息
        path: 'administration', name: 'AdministrationManage', component: AdministratorManage,
        meta: {title: '管理员信息'}
      },
      { // 数据统计
        path: 'dataAnalysis', name: 'DataAnalysis', component: () => import("../views/manager/DataAnalysis.vue"),

      }
    ],
  },
  { // 404
    path:'/404', name: 'NotFound', component: () => import("../views/404.vue"),
    meta: {title: '404 Not Found'}
  },
  {
    path: '/:pathMatch(.*)*',redirect: "/404"
  },

]

const router = createRouter({ // 路由工作模式
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()  // 跳转
})

export default router
