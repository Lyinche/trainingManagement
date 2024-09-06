import { createRouter, createWebHistory } from 'vue-router';
import { useCounterStore } from '@/stores/routerStore';
import { useIndexStore } from '@/stores';
import Login from '../views/Login.vue';
import MainBox from '../views/MainBox.vue';
import Routers from './config';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/mainBox',
        name: 'mainBox',
        component: MainBox,
    },
    {
        path: '/',
        redirect: '/index',
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

let isRedirecting = false;

//路由拦截
router.beforeEach((to, from, next) => {
    //每次路由跳转之前都会执行
    if (to.name === 'login') {
        next();
    } else {
        //如果登录过了 就直接跳转
        //未登录 重定向到login
        if (!localStorage.getItem('token')) {
            next({ path: '/login' });
        } else {
            const store = useCounterStore();

            if (!store.isGetterRouter) {
                //登录之后可以动态添加路由
                ConfigRouter(store);

                if (!isRedirecting) {
                    isRedirecting = true;
                    next({
                        //添加之后需要定向这个路由
                        path: to.fullPath,
                    });
                } else {
                    next();
                }
            } else {
                next();
            }
        }
    }
});

/**
 * 循环嵌套路由
 * 用于动态添加
 * 使用后store状态避免重复添加路由
 * 并且规范化封装
 */
const ConfigRouter = store => {
    //循环给嵌套路由
    Routers.forEach(item => {
        const store = useIndexStore();
        if ((item.Admin && store.userInfo.role !== 2) || !item.Admin) {
            router.addRoute('mainBox', item);
        }
    });
    //修改仓库状态
    store.changeGetterRouter(true);
};
export default router;
