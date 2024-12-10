import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookManageView from "@/views/manage/BookManage.vue";
import UserManageView from "@/views/manage/UserManage.vue";
import NotificationManageView from "@/views/manage/NotificationManage.vue";
import ReservationManageView from "@/views/manage/ReservationManage.vue";
import BorrowManageView from "@/views/manage/BorrowManage.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/books',
    name: 'BookManage',
    component: BookManageView
  },
  {
    path: '/users',
    name: 'UserManage',
    component: UserManageView
  },
  {
    path: '/notification',
    name: 'NotificationManage',
    component: NotificationManageView
  },
  {
    path: '/reservation',
    name: 'ReservationManage',
    component: ReservationManageView
  },
  {
    path: '/borrow',
    name: 'BorrowManage',
    component: BorrowManageView
  }
]

const router = createRouter({ // 路由工作模式
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
