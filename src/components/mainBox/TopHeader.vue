<template>
<el-header>
    <div class="left" @click="Collapse">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan"></use>
        </svg>
        <span style="margin-left: 10px; font-weight: 900;">综合管理系统</span>
    </div>
    <div class="right">
        <span class="title">欢迎{{ identityText }}:{{ store.userInfo.username }}</span>
        <el-dropdown>
    <span class="el-dropdown-link">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wodeshenfenquequan"></use>
        </svg>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="personal">个人中心</el-dropdown-item>
        <el-dropdown-item>更多选项</el-dropdown-item>
        <el-dropdown-item @click="quit">退出登录</el-dropdown-item>

      </el-dropdown-menu>
    </template>
</el-dropdown>
</div>
</el-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useIndexStore } from "../../stores/index";
import { ref, computed } from "vue";
const router = useRouter()
const store = useIndexStore()
const identityText = computed(() => {
    switch (store.userInfo.role) {
        case 0:
            return "管理员"
        case 1:
            return "老师"
        case 2:
            return "学生"
    }
})
const Collapse = () => {
    store.isCollapse = !store.isCollapse
}
/** 
 * @param 个人中心
 */
const personal = () => {
    router.push('/center')
}
/** 
 * @param 退出登录
 * @param 清除token
 * @param 清除store内存
 */
const quit = () => {
    router.push('/login')
    localStorage.removeItem('token')
    store.userInfo = {}
}
</script>

<style lang="scss" scoped>
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2b3a4d;
    color: #fff;
    border-bottom: 1px solid #ccc;
    width: 100%;
    height: 60px;

    .left {
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .right {
        display: flex;
        align-items: center;

        .title {
            margin-right: 10px;
        }
    }

    .icon {
        cursor: pointer;
        width: 30px;
        height: 30px;
        background-color: #fff;
    }
}
</style>