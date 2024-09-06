<template>
    <div>
        <el-card class="box_card"
            ><el-page-header icon="" title="内容管理" content="内容列表" />
            <el-table :data="tableData" style="width: 100%; margin-top: 5px">
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="category" label="类别">
                    <template #default="scope">
                        <el-tag type="primary" v-if="scope.row.role === 2">案例</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.role === 1">动态</el-tag>
                        <el-tag type="danger" v-else>通知</el-tag>
                    </template>
</el-table-column>

<el-table-column prop="editTime" label="发布时间">
    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
</el-table-column>
<el-table-column prop="status" label="是否发布">
    <template #default="scope">
                        <el-switch
                            v-model="scope.row.status"
                            inline-prompt
                            :active-value="1"
                            :inactive-value="0"
                            active-text="是"
                            inactive-text="否"
                            @change="handleStatusChange(scope.row)"
                        />
                    </template>
</el-table-column>

<el-table-column label="操作">
    <template #default="scope">
                        <el-tooltip class="box-item" effect="dark" content="预览内容" placement="top">
                            <el-button circle type="success" @click="handlePreview(scope.row)" :icon="View"></el-button>
                        </el-tooltip>
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
<el-dialog v-model="dialogVisible" title="预览内容" width="500">
    <div>
        <h3>{{ previewData.title }}</h3>
        <div style="font-size: 12px; color: gray;"> {{ formatTime.getTime(previewData.editTime) }} </div>
        <el-divider>
            <el-icon><star-filled /></el-icon>
        </el-divider>
        <div ref="vHtml" class="htmlContent">
        </div>
    </div>
</el-dialog>
</div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index';
import { onMounted, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router'
import formatTime from '@/util/formatTime';
import { View, Edit, Delete, StarFilled } from '@element-plus/icons-vue';
import axios from 'axios';
//路由
const router = useRouter()
//仓库
const store = useIndexStore();
//表格数据
const tableData = ref([]);
//预览数据
const previewData = ref({})
//弹出层控制
const dialogVisible = ref(false)
//用于渲染html的标签实例
const vHtml = ref(null)

/* 删除 */
const handleDelete = async data => {
    let res = await axios.delete(`/adminApi/blog/list${data._id}`)
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
    let res = await axios.get(`/adminApi/blog/list${store.userInfo._id}`);
    if (res) {
        tableData.value = res.data.data;
    }
};
//监听发布状态变化
const handleStatusChange = async (data) => {
    await axios.put(`/adminApi/blog/status`, {
        _id: data._id,
        status: data.status,
    });
    //重新获取数据
    getTableData();
}
//预览内容按钮
const handlePreview = (data) => {
    previewData.value = data
    dialogVisible.value = true
    // vHtml.value.innerHTML = previewData.value.content
    nextTick(() => {
        if (vHtml.value) {
            vHtml.value.innerHTML = previewData.value.content;
        }
    });
};
//编辑
const handleEdit = (data) => {
    //跳转新路由:id 根据id渲染内容
    router.push(`/blogsEdit/${data._id}`)
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
