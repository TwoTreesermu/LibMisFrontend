import { createRouter, createWebHistory } from 'vue-router'
import BookManage from "@/views/manager/BookManage.vue";
import UserManage from "@/views/manager/UserManage.vue";
import NotificationManage from "@/views/manager/NotificationManage.vue";
import ReservationManage from "@/views/manager/ReservationManage.vue";
import BorrowManage from "@/views/manager/BorrowManage.vue";
import AdministratorManage from "@/views/manager/AdministratorManage.vue";


const routes = [
  {
    path: "/", name:"Login", component: () => import("../views/Login.vue"),
  },
  {  // 登录页面
    path: "/login", name:"Login", component: () => import("../views/Login.vue"),
  },
  {  // 用户页面
    path:"/user", name: "User", component: () => import("../views/User.vue"),
  },
  { // 管理员页面
    path: '/manager', name: 'Manager', component: () => import("../views/Manager.vue"),
    children: [
      { // 管理员可视化首页
        path: "homePage", name: "HomePage", component: () => import("../views/manager/HomePage.vue"),
      },
      {  // 图书信息
        path: 'book', name: 'BookManage', component: BookManage
      },
      { // 用户信息
        path: 'user', name: 'UserManage', component: UserManage, meta: { requiresAuth: true, isAdmin: true }
      },
      { // 通知
        path: 'notification', name: 'NotificationManage', component: NotificationManage, meta: { requiresAuth: true, isAdmin: true }
      },
      { // 预约
        path: 'reservation', name: 'ReservationManage', component: ReservationManage, meta: { requiresAuth: true, isAdmin: true }
      },
      { // 借阅
        path: 'borrow', name: 'BorrowManage', component: BorrowManage,
      },
      { // 管理员信息
        path: 'administration', name: 'AdministrationManage', component: AdministratorManage,
      },
    ]
  },
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
