<template>
    <div>
        <el-page-header @click="handleBack"  title="返回上一页" content="编辑课程" />
        <el-form ref="courseFormRef" :model="courseForm" :rules="courseFormRules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="课程名称" prop="name">
                <el-input v-model="courseForm.name" clearable />
            </el-form-item>
            <el-form-item label="课程简介" prop="introduction">
                <el-input v-model="courseForm.introduction" clearable />
            </el-form-item>
            <el-form-item label="详细描述" prop="detail">
                <el-input v-model="courseForm.detail" clearable />
            </el-form-item>
            <el-form-item label="课程封面" prop="cover">
                <Upload :avatar="courseForm.cover" @updateAvatar="coverChange" />
            </el-form-item>
            <el-form-item>
                <el-button class="submit" type="primary" @click="submit()">更新内容</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import Upload from '@/components/Upload/Upload.vue';
import upData from '@/util/updata';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, onMounted } from 'vue';
const courseFormRef = ref();
const router = useRouter()
const route = useRoute()
const courseForm = reactive({
    name: '',//名称
    introduction: "",//简介
    detail: "",//详细描述
    cover: "",//封面
    file: null,
    _id: ''
});
const courseFormRules = reactive({
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    introduction: [{ required: true, message: '请输入简介', trigger: 'blur' }],
    detail: [{ required: true, message: '请输入详细描述', trigger: 'blur' }],
    cover: [{ required: true, message: '请上传封面', trigger: 'blur' }],
});
//返回上一页
const handleBack = () => {
    router.back()
}
//上传封面
const coverChange = file => {
    //前端临时路径
    courseForm.cover = URL.createObjectURL(file);
    //传给后端的路径
    courseForm.file = file;
};


const submit = () => {
    courseFormRef.value.validate(async (valid) => {
        //只有通过所有校验之后才返回true 否则是false
        if (valid) {
            let res = await upData("/adminApi/course/updateCourse", courseForm);
            if (res.data.ActionType === "OK") {
                ElNotification({
                    title: '修改成功',
                    message: '修改新内容成功!2秒后跳转到内容列表页面!',
                    type: 'success',
                })
                setTimeout(() => {
                    router.back()
                }, 2000);
            } else {
                ElNotification({
                    title: '修改失败',
                    message: '请检查信息,晚点再试',
                    type: 'error',
                })
            }
        }
    })
}
//查询内容
const getData = async () => {
    let res = await axios.get(`/adminApi/course/getDate${route.params.id}`)
    // console.log(res.data.data);
    Object.assign(courseForm, res.data.data[0]);
    console.log(courseForm);
}
//组件渲染完成后取回当前内容数据
onMounted(() => {
    getData()
})
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 10px;
}

.category {
    z-index: 1000;
}

.submit {
    display: block;
    margin: 0 auto;
    width: 20%;
}
</style>
