<template>
    <div>
        <el-card class="box_card"
            ><el-page-header icon="" title="课程管理" content="课程列表" />
            <el-table :data="tableData" style="width: 100%; margin-top: 5px">
                <el-table-column prop="name" label="课程名称" />

<el-table-column prop="introduction" label="简介">
</el-table-column>
<el-table-column label="操作">
    <template #default="scope">
                        <el-tooltip class="box-item" effect="dark" content="编辑内容" placement="top">
                            <el-button  circle :icon="Edit"  @click="handleEdit(scope.row)" ></el-button>
                        </el-tooltip>
                        <el-popconfirm
                            title="你确定要删除这个吗?"
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)"
                        >
                            <template #reference>
                                <el-button circle :icon="Delete" type="danger" round></el-button>
                            </template>
</el-popconfirm>
</template>
</el-table-column>
</el-table>
</el-card>
</div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { Edit, Delete } from '@element-plus/icons-vue';
import axios from 'axios';
//路由
const router = useRouter()
//仓库
const store = useIndexStore();
//表格数据
const tableData = ref([]);

/* 删除 */
const handleDelete = async data => {
    let res = await axios.delete(`/adminApi/course/list${data._id}`)
    if (res.data.ActionType === 'OK') {
        ElNotification({
            title: '删除成功!',
            message: '删除该内容成功!',
            type: 'success',
        })
    } else {
        ElNotification({
            title: '删除失败',
            message: '删除失败,请晚点刷新后再试',
            type: 'error',
        })
    }
    getTableData()
};

//请求数据
const getTableData = async () => {
    let res = await axios.get(`/adminApi/course/list${store.userInfo._id}`);
    if (res) {
        tableData.value = res.data.data;
    }
};
//编辑
const handleEdit = (data) => {
    //跳转新路由:id 根据id渲染内容
    router.push(`/courseEdit/${data._id}`)
}

onMounted(async () => {
    getTableData();

});
</script>

<style lang="scss" scoped>
:deep(.htmlContent) {
    img {
        max-width: 100%;
    }
}
</style>
