import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/assets/css/global.css'
import zhCn from "element-plus/es/locale/lang/zh-cn"

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus, {
    locale:zhCn,
})
app.mount('#app')

// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// createApp(App).use(store).use(router).use(ElementPlus,{locale:zhCn,}).mount('#app')
