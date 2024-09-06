<template>
    <div class="body">
        <div class="stars" ref="starsRef">
            <div class="star" v-for="(item, index) in starsCount" :key="index"></div>
        </div>
    </div> 
    <div class="formContent">
    <h3 style="color: black; font-size: 30px">{{ title ? "综合管理系统" : '账号或密码错误' }}</h3>
    <el-form
      ref="LoginFormRef"
      :model="LoginFrom"
      label-width="85px"
      class="loginForm"
      :rules="LoginRules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="LoginFrom.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="LoginFrom.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import router from "@/router";
import { onMounted, ref } from "vue";
import { reactive } from "vue";
import axios from "axios";
import { useIndexStore } from '@/stores/index'
const indexStore = useIndexStore()

const title = ref(true)
//表单响应式对象
const LoginFrom = reactive({
    username: "",
    password: ""
});
//表单实例对象
const LoginFormRef = ref(null);
//rules规则
const LoginRules = reactive({
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
    ],
});

// 处理表单提交逻辑
const submit = () => {
    LoginFormRef.value.validate(valid => {
        //只有通过所有校验之后才返回true 否则是false
        if (valid) {
            axios.post("/adminApi/user/login", LoginFrom).then(res => {
                if (res.data.ActionType === "OK") {
                    indexStore.userInfo = res.data.data
                    router.push('/index');
                } else {
                    title.value = false
                }
            })
        }
    });
};




/*-- 星星-- */
const starsRef = ref(null);
const starsCount = 800; // 星星数量
const distance = 900; // 间距
onMounted(() => {
    const starNodes = Array.from(starsRef.value.children);
    starNodes.forEach((item) => {
        const speed = 0.2 + Math.random() * 1;
        const thisDistance = distance + Math.random() * 300;
        item.style.transformOrigin = `0 0 ${thisDistance}px`;
        item.style.transform = `
            translate3d(0,0,-${thisDistance}px)
            rotateY(${Math.random() * 360}deg)
            rotateX(${Math.random() * -50}deg)
            scale(${speed},${speed})`;
    });
});
</script>

<style lang="scss" scoped>
.formContent {
    width: 500px;
    height: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(111, 114, 114, 0.296);
    color: rgb(0, 0, 0);
    text-align: center;
    padding: 20px;

    :deep(.el-form-item__label) {
        color: black;
        font-weight: 900;
    }

    .loginForm {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}

.body {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: radial-gradient(200% 100% at bottom center,
            #f7f7b6,
            #e96f92,
            #1b2947);
    background: radial-gradient(200% 105% at top center,
            #1b2947 10%,
            #75517d 40%,
            #e96f92 65%,
            #f7f7b6);
    background-attachment: fixed;
    overflow: hidden;
}

@keyframes rotate {
    0% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }

    100% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
    }
}

.stars {
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: absolute;
    perspective-origin: 50% 100%;
    left: 45%;
    animation: rotate 90s infinite linear;
    bottom: 0;
}

.star {
    width: 2px;
    height: 2px;
    background: #f7f7b6;
    position: absolute;
    left: 0;
    top: 0;
    backface-visibility: hidden;
}

.form-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>