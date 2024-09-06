/**
 * 路由配置
 * 存放静态的路由路径
 * 用于router.js文件内调用
 */
import Home from '@/views/home/Home.vue';
import Center from '@/views/center/Center.vue';
import BlogsList from '@/views/blogs-manage/BlogsList.vue';
import BlogsAdd from '@/views/blogs-manage/BlogsAdd.vue';
import BlogsEdit from '@/views/blogs-manage/BlogsEdit.vue';
import CourseAdd from '@/views/course-manage/CourseAdd.vue';
import CourseList from '@/views/course-manage/CourseList.vue';
import CourseEdit from '@/views/course-manage/CourseEdit.vue';
import UserAdd from '@/views/user-manage/UserAdd.vue';
import UserList from '@/views/user-manage/UserList.vue';

const Routers = [
    {
        path: '/index',
        component: Home,
    },
    {
        path: '/center',
        component: Center,
    },
    {
        path: '/blogsList',
        component: BlogsList,
    },
    {
        path: '/blogsAdd',
        component: BlogsAdd,
    },
    {
        path: '/blogsEdit/:id',
        component: BlogsEdit,
    },
    {
        path: '/courseAdd',
        component: CourseAdd,
    },
    {
        path: '/courseList',
        component: CourseList,
    },
    {
        path: '/courseEdit/:id',
        component: CourseEdit,
    },
    {
        path: '/userAdd',
        component: UserAdd,
        Admin: true,
    },
    {
        path: '/userList',
        component: UserList,
        Admin: true,
    },
];

export default Routers;
