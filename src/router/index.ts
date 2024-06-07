import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/vehicle/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import DetailsView from "@/views/vehicle/DetailsView.vue";
import RegisterView from "@/views/RegisterView.vue";
import NewVehicleView from "@/views/vehicle/NewVehicleView.vue";

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
            path: '/new-vehicle',
            name: 'new-vehicle',
            component: NewVehicleView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
    ]
});

export default router;
