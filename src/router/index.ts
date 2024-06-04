import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/vehicle/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import DetailsView from "@/views/vehicle/DetailsView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/vehicle-details/:id',
            name: 'vehicle-details',
            component: DetailsView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },

    ]
});

export default router;
