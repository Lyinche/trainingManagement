<template>
    <div>
        <el-page-header icon="" title="综合管理系统" content="个人中心" />

        <el-row :gutter="30" class="el-row">
            <el-col :span="8"
                ><el-card style="max-width: 100%" class="box-card">
                    <el-avatar :size="100" :src="store.userInfo.avatar" />
                    <h3>{{ store.userInfo.username }}</h3>
                    <h3>{{ identityText }}</h3>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card style="max-width: 100%" class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span style="font-weight: 900;">个人信息</span>
                        </div>
                    </template>
<el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" clearable />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
        <el-select style="width: 100%" v-model="userForm.gender" class="m-2" placeholder="修改性别">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </el-form-item>
    <el-form-item label="简介" prop="introduction">
        <el-input v-model="userForm.introduction" type="textarea" :rows="4" />
    </el-form-item>
    <el-form-item label="上传头像" prop="avatar">
        <Upload :avatar="userForm.avatar" @updateAvatar="handleChange" />
    </el-form-item>
    <el-button type="primary" @click="submit()">修改</el-button>

</el-form>

</el-card>
</el-col>
</el-row>
</div>
</template>

<script setup>
import { useIndexStore } from '@/stores';
import { computed, ref, reactive } from 'vue';

import Upload from "@/components/Upload/Upload.vue";
import upData from '@/util/updata';

const store = useIndexStore();
const userFormRef = ref();
const { username, gender, introduction, avatar } = store.userInfo
//双向绑定的对象
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file: avatar,
});

//性别选择信息
const options = [
    { label: '保密', value: 0 },
    { label: '男', value: 1 },
    { label: '女', value: 2 },
];
//校验规则
const userFormRules = reactive({
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ],
    gender: [
        {
            required: true,
            message: '请选择性别',
            trigger: 'blur',
        },
    ],
})
//权限判断
const identityText = computed(() => {
    switch (store.userInfo.role) {
        case 0:
            return '管理员';
        case 1:
            return '老师';
        case 2:
            return '学生';
    }
});
//图片选择完之后的回调
const handleChange = (file) => {
    userForm.avatar = URL.createObjectURL(file);
    userForm.file = file;
};

// //确认上传
const submit = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            let res = await upData("/adminApi/user/update", userForm)
            if (res.data.ActionType === "OK") {

                store.userInfo.username = res.data.data.username
                store.userInfo.gender = res.data.data.gender
                store.userInfo.introduction = res.data.data.introduction
                if (res.data.data.avatar) {
                    store.userInfo.avatar = res.data.data.avatar;
                }
                ElNotification({
                    title: '修改成功',
                    message: '修改成功~',
                    type: 'success',
                })
            } else {
                ElNotification({
                    title: '修改失败',
                    message: '修改失败,请晚点再试',
                    type: 'error',
                })
            }
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
</style>
