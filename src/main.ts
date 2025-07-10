import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { MotionPlugin, MotionDirective } from '@vueuse/motion'

const app = createApp(App)
app.use(createPinia())
app.use(MotionPlugin)
app.directive('v-motion', MotionDirective())

app.mount('#app')
