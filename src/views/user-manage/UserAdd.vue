<template>
    <div>
        <el-page-header icon="" title="用户管理" content="添加新用户" />
                <el-card class="box_card">

        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password" clearable />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
        <el-select style="width: 100%" v-model="userForm.gender" class="m-2" placeholder="修改性别">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
    <el-form-item label="身份" prop="role">
        <el-select style="width: 100%" v-model="userForm.role" class="m-2" placeholder="修改性别">
            <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
    <el-form-item label="简介" prop="introduction">
        <el-input v-model="userForm.introduction" type="textarea" :rows="2" />
    </el-form-item>
    <el-form-item label="上传头像" prop="avatar">
        <Upload :avatar="userForm.avatar" @updateAvatar="handleChange" />
    </el-form-item>
    <el-button class="submit" type="primary" @click="submit()">创建新用户</el-button>

    </el-form>
    </el-card>
    </div>
</template>

<script setup>
import Upload from '@/components/Upload/Upload.vue';
import { useIndexStore } from '@/stores';
import upData from '@/util/updata';
import { reactive, ref } from 'vue';
const userFormRef = ref();
const store = useIndexStore()

//双向绑定的对象
const userForm = reactive({
    username: '',
    password: '',
    role: 2,//1老师 2学生
    gender: 0,//0保密 1男 2女
    introduction: "",
    avatar: "",
    file: null,
    creator: store.userInfo._id
});
//性别选择信息
const options = [
    { label: '保密', value: 0 },
    { label: '男', value: 1 },
    { label: '女', value: 2 },
];
//性别选择信息
const roleOptions = [
    { label: '老师', value: 1 },
    { label: '学生', value: 2 },
];
//校验规则
const userFormRules = reactive({
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    avatar: [{ required: true, message: '头像不能为空', trigger: 'blur' }],
});

//图片选择完之后的回调
const handleChange = (file) => {
    userForm.avatar = URL.createObjectURL(file);

    userForm.file = file;
};
//提交
const submit = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            let res = await upData("/adminApi/user/addUser", userForm);
            ElNotification({
                title: '创建成功',
                message: '创建新用户成功!',
                type: 'success',
            })
        } else {
            ElNotification({
                title: '创建失败',
                message: '请检查信息,晚点再试',
                type: 'error',
            })
        }
    });
};

</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
    }
}

.submit {
    display: block;
    margin: 0 auto;
    width: 20%;
}


.box_card {
    margin-top: 20px;
}
</style>
