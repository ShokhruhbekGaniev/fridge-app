import { createApp } from 'vue'
import './sass/app.scss'
import { GlobalMixin } from './mixins'
import App from './App.vue'
import router from './router'


createApp(App)
    .use(router)
    .mixin(GlobalMixin)
    .mount('#app')
