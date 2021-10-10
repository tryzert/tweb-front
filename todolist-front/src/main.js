import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'

import './index.css'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/todolist',
            name: 'Home',
            component: Home
        }
    ]
})

createApp(App).use(router).mount('#app')
