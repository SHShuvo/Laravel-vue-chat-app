import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/useAuthStore';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', name:'home', component: () => import('../components/home/Home.vue') },
    { path: '/login', name:'login', component: () => import('../components/auth/login.vue') },
    { path: '/dashboard', name:'dashboard', component: () => import('../components/dashboard/Dashboard.vue') },
]
  
const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    const {authenticated} = storeToRefs(useAuthStore());
    
    const publicPages = ['/', '/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    
    if (authRequired && !authenticated.value) {
        return next('/login');
    }
    next();
});

export default router;