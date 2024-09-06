<template>
    <div>
        <el-page-header @click="handleBack"  title="返回上一页" content="编辑内容" />
        <el-form ref="blogsFormRef" :model="blogsForm" :rules="blogsFormRules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="blogsForm.title" clearable />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <editor @event="handleChange"  :content="blogsForm.content" v-if="blogsForm.content"   />
            </el-form-item>
            <el-form-item label="类别" prop="category">
                <!-- 选择器 -->
                <el-select style="width: 100%" v-model="blogsForm.category" class="m-2" placeholder="选择类别">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <Upload :avatar="blogsForm.cover" @updateAvatar="coverChange" />
            </el-form-item>
            <!-- 创建内容 -->
            <el-form-item>
                <el-button class="submit" type="primary" @click="submit()">更新内容</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { useIndexStore } from '@/stores';
import Upload from '@/components/Upload/Upload.vue';
import upData from '@/util/updata';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, onMounted } from 'vue';
import editor from "@/components/editor/editor.vue"
const store = useIndexStore()
const blogsFormRef = ref();
const router = useRouter()
const route = useRoute()
const blogsForm = reactive({
    title: '',//标题
    content: "",//内容
    category: 1,    //类型 1动态 2案例 3通知
    cover: "",//封面
    file: null,
    creator: store.userInfo._id,//创建人
    status: 0,//状态 0未发布 1发布
});
const options = [
    { label: '通知', value: 0 },
    { label: '动态', value: 1 },
    { label: '案例', value: 2 },
];
const blogsFormRules = reactive({
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
    category: [{ required: true, message: '请选择类型', trigger: 'blur' }],
    cover: [{ required: true, message: '请上传封面', trigger: 'blur' }],
});
//富文本内容改变的事件
const handleChange = (data) => {
    blogsForm.content = data
}
//返回上一页
const handleBack = () => {
    router.back()
}
//上传封面
const coverChange = file => {
    //前端临时路径
    blogsForm.cover = URL.createObjectURL(file);
    //传给后端的路径
    blogsForm.file = file;
};


const submit = () => {
    blogsFormRef.value.validate(async (valid) => {
        //只有通过所有校验之后才返回true 否则是false
        if (valid) {
            let res = await upData("/adminApi/blog/updateBlog", blogsForm);
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
const getBlog = async () => {
    let res = await axios.get(`/adminApi/blog/getBlog${route.params.id}`)
    Object.assign(blogsForm, res.data.data);


}
//组件渲染完成后取回当前内容数据
onMounted(() => {
    getBlog()
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
