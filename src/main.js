import { createApp } from 'vue'
import { createPinia } from 'pinia'
import routerFactory from '@/routers/index.js'
import i18nFactory from '@/utils/i18n/index.js'
import VueApexCharts from "vue3-apexcharts";

// import { createYmaps } from 'vue-yandex-maps'
import Vue3Lottie from 'vue3-lottie'
import App from './App.vue'
import '@/assets/styles/main.scss'
import 'ant-design-vue/dist/reset.css'
// import 'vue-yandex-maps/css'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)

const i18n = i18nFactory()

app.use(routerFactory(i18n.global))
app.use(i18n)
app.use(Vue3Lottie)
app.use(VueApexCharts);
app.mount('#app')
