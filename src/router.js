import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue';
import ViewProduct from './pages/Product/View.vue';
import EditProduct from './pages/Product/Edit.vue';
import CreateProduct from './pages/Product/Create.vue';

const routes = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/create',
            name: 'CreateProduct',
            component: CreateProduct,
        },
        {
            path: '/edit/:id',
            name: 'EditProduct',
            component: EditProduct,
        },
        {
            path: '/view/:id',
            name: 'ViewProduct',
            component: ViewProduct,
        }
    ]
});

export default routes;