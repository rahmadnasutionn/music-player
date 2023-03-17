import { createRouter, createWebHashHistory } from 'vue-router'

const HomeView = () =>
    import ('../views/HomeView.vue');
const AboutView = () =>
    import ('../views/AboutView.vue');
const ManageView = () =>
    import ('../views/ManageView.vue');
const LoginView = () =>
    import ('../views/LoginView.vue');
const RegisterView = () =>
    import ('../views/RegisterView.vue');

const SongView = () =>
    import ('../views/SongView.vue');

const routes = [{
        path: '/',
        name: 'Home',
        component: HomeView,
        beforeEnter: (to, from, next) => {
            next();
        }
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
    },
    {
        path: '/manage',
        name: 'Manage',
        component: ManageView,
        beforeEnter: (to, from, next) => {
            next();
        }
    },
    {
        path: '/song/:id',
        name: 'Song',
        component: SongView
    },
    {
        path: '/signin',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'text-yellow-600 underline transition-all duration-200'
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;