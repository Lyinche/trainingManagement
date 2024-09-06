<template>
    <div>
        <el-page-header icon="" title="课程管理" content="创建新课程" />
                <el-card class="box_card">

        <el-form ref="courseFormRef" :model="courseForm" :rules="courseFormRules" label-width="80px" class="demo-ruleForm">
    <el-form-item label="课程名称" prop="name">
        <el-input v-model="courseForm.name" clearable />
    </el-form-item>
        <el-form-item label="课程简介" prop="introduction">
        <el-input v-model="courseForm.introduction" type="textarea" :rows="2" />
    </el-form-item>
    <el-form-item label=" 详细描述" prop="detail">
        <el-input v-model="courseForm.detail" type="textarea" clearable />
    </el-form-item>

    <el-form-item label="封面" prop="cover">
        <Upload :avatar="courseForm.cover" @updateAvatar="handleChange" />
    </el-form-item>
    <el-button class="submit" type="primary" @click="submit()">创建新课程</el-button>

    </el-form>
    </el-card>
    </div>
</template>

<script setup>
import Upload from '@/components/Upload/Upload.vue';
import { useRouter } from 'vue-router'
import { useIndexStore } from '@/stores';
import upData from '@/util/updata';
import { reactive, ref } from 'vue';
const courseFormRef = ref();
const store = useIndexStore()
const router = useRouter()

//双向绑定的对象
const courseForm = reactive({
    name: '',
    detail: '',
    introduction: "",
    cover: "",
    file: null,
    creator: store.userInfo._id
});
//校验规则
const courseFormRules = reactive({
    name: [{ required: true, message: '课程名称不能为空', trigger: 'blur' }],
    introduction: [{ required: true, message: '课程简介不能为空', trigger: 'blur' }],
    detail: [{ required: true, message: '详细描述不能为空', trigger: 'blur' }],
    cover: [{ required: true, message: '封面不能为空', trigger: 'blur' }],
});

//图片选择完之后的回调
const handleChange = (file) => {
    courseForm.cover = URL.createObjectURL(file);
    courseForm.file = file;
};
//提交
const submit = () => {
    courseFormRef.value.validate(async (valid) => {
        if (valid) {
            let res = await upData("/adminApi/course/addCourse", courseForm);
            if (res.data.ActionType === "OK") {
                ElNotification({
                    title: '创建成功',
                    message: '创建新内容成功!马上跳转课程列表页面!',
                    type: 'success',
                })
                setTimeout(() => {
                    router.push('/courseList');
                }, 2000);
            }
        }
    });
}


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
