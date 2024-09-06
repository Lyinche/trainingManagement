<template>
    <el-aside :width="store.isCollapse ? '64px' : '230px'">
        <el-menu :router="true"
        :default-active="route.fullPath"
        :collapse="store.isCollapse" :collapse-transition="false">
            <el-menu-item index="/index">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a-ziyuan26"></use>
                </svg>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/center">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-kehuleixing"></use>
                </svg>
                <span>个人中心</span>
            </el-menu-item>

            <el-sub-menu index="/user-manage" v-admin>
                <template #title>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-a-ziyuan11"></use>
                    </svg>
                    <span>用户管理</span>
                </template>
<el-menu-item index="/userAdd">添加用户</el-menu-item>
<el-menu-item index="/userList">用户列表</el-menu-item>
</el-sub-menu>
<el-sub-menu index="/blogs-manage">
    <template #title>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-a-ziyuan34"></use>
                    </svg>
                    <span>内容管理</span>
                </template>
    <el-menu-item index="/blogsAdd">创建内容</el-menu-item>
    <el-menu-item index="/blogsList">内容列表</el-menu-item>
</el-sub-menu>
<el-sub-menu index="/course-manage">
    <template #title>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shangpinguanli"></use>
                    </svg>
                    <span>课程管理</span>
                </template>
    <el-menu-item index="/courseAdd">添加课程</el-menu-item>
    <el-menu-item index="/courseList">课程列表</el-menu-item>
</el-sub-menu>
</el-menu>
</el-aside>
</template>

<script setup>
import { useIndexStore } from '../../stores/index';
import { useRoute } from 'vue-router';
const store = useIndexStore();
const route = useRoute();

//封装的指令
const vAdmin = {
    mounted(el) {
        if (store.userInfo.role !== 0 && store.userInfo.role !== 1) {
            // 在这里执行你的方法
            if (el.parentNode) {
                el.remove();
            }
        }
    }
}


</script>

<style lang="scss" scoped>
.el-aside {
    height: 100vh;

    .el-menu {
        height: 100vh;
    }
}
</style>
