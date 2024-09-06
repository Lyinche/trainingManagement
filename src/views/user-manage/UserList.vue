<template>
    <div>
        <el-page-header icon="" title="用户管理" content="用户列表" />
        <el-card>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="username" label="用户名" />
                <el-table-column prop="avatar" label="头像">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="30" :src="scope.row.avatar"></el-avatar>
                        </div>
                    </template>
</el-table-column>
<el-table-column prop="role" label="角色">
    <template #default="scope">
                        <el-tag type="primary" v-if="scope.row.role === 2">学生</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.role === 1">老师</el-tag>
                        <el-tag type="danger" v-else>管理员</el-tag>
                    </template>
</el-table-column>
<el-table-column label="操作">
    <template #default="scope">
                        <el-button size="small" type="primary" round @click="handleEdit(scope.row)">编辑</el-button>
                        <el-popconfirm title="你确定要删除这个吗?"
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)"
                        >
                            <template #reference>
                                <el-button size="small" type="danger" round 
                                    >删除</el-button
                                >
                            </template>
    </el-popconfirm>
    </template>
</el-table-column>
</el-table>
</el-card>

<el-dialog v-model="dialogVisible" title="编辑用户" width="500">
    <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" type="password" clearable />
        </el-form-item>
        <el-form-item label="身份" prop="role">
            <el-select style="width: 100%" v-model="userForm.role" class="m-2" placeholder="修改性别">
                <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEdiConfirm">
          确认
        </el-button>
      </div>
    </template>
</el-dialog>
</div>
</template>

<script setup>
import { useIndexStore } from '@/stores';
import axios from 'axios';
import { ref, onMounted, reactive } from 'vue';
const store = useIndexStore()
//弹出框
const dialogVisible = ref(false);
//表单实例
const userFormRef = ref();

//双向绑定表单
let userForm = reactive({
    username: '',
    password: '',
    role: 2,//1老师 2学生
});

//权限选择信息
const roleOptions = [
    { label: '老师', value: 1 },
    { label: '学生', value: 2 },
];
//校验规则
const userFormRules = reactive({
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
});
const tableData = ref([]);
/* 获取用户列表 */
const getTableData = async () => {
    let res = await axios.get(`/adminApi/user/list${store.userInfo._id}`);

    tableData.value = res.data.data;
};
onMounted(async () => {
    getTableData()
});
/* 编辑 */
const handleEdit = async data => {
    let res = await axios.get(`/adminApi/user/customer${data._id}`)
    Object.assign(userForm, res.data.data);
    dialogVisible.value = true
};
/* 删除 */
const handleDelete = async data => {
    if (data.role !== 0) {
        let res = await axios.delete(`/adminApi/user/list${data._id}`)
        if (res.data.ActionType === 'OK') {
            ElNotification({
                title: '删除成功!',
                message: '删除该用户成功!',
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
    } else {
        ElNotification({
            title: '删除失败',
            message: '删除失败,没有权限删除管理员',
            type: 'error',
        })
    }

};
/* 更新修改 */
const handleEdiConfirm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            //更新后端
            let res = await axios.put(`/adminApi/user/list:${userForm._id}`, userForm)
            //隐藏弹出框
            dialogVisible.value = false
            //重新获取新的数据
            getTableData()
        }
    })
}
</script>

<style lang="scss" scoped>
.el-card {
    margin-top: 10px;
}
</style>
