import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookManage from "@/views/manage/BookManage.vue";
import UserManage from "@/views/manage/UserManage.vue";
import NotificationManage from "@/views/manage/NotificationManage.vue";
import ReservationManage from "@/views/manage/ReservationManage.vue";
import BorrowManage from "@/views/manage/BorrowManage.vue";
import AdministratorManage from "@/views/manage/AdministratorManage.vue";
import AdminHome from "@/views/AdminHome.vue";
import UserHome from "@/views/UserHome.vue";


const routes = [
  {
    path: "/login", name:"Login", component: () => import("../views/Login.vue"),
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/book',
    name: 'BookManage',
    component: BookManage
  },
  {
    path: '/user',
    name: 'UserManage',
    component: UserManage,
    meta: { requiresAuth: true, isAdmin: true }
  },
  {
    path: '/notification',
    name: 'NotificationManage',
    component: NotificationManage,
    meta: { requiresAuth: true, isAdmin: true }
  },
  {
    path: '/reservation',
    name: 'ReservationManage',
    component: ReservationManage,
    meta: { requiresAuth: true, isAdmin: true }
  },
  {
    path: '/borrow',
    name: 'BorrowManage',
    component: BorrowManage,
  },
  {
    path: '/administration',
    name: 'AdministrationManage',
    component: AdministratorManage,
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome,
  },
  {
    path: '/user',
    name: 'UserHome',
    component: UserHome,
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // }
]

const router = createRouter({ // 路由工作模式
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//
// // 路由守卫
// router.beforeEach((to, from, next) => {
//   const { isAuthenticated, userRole } = store.state;
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next({ name: 'Login' });
//     } else {
//       const isRoleMatch = to.meta.isAdmin ? userRole === 'admin' : userRole === 'user';
//       if (isRoleMatch) {
//         next();
//       } else {
//         next({ name: 'Login' });
//       }
//     }
//   } else {
//     next();
//   }
// });

export default router
