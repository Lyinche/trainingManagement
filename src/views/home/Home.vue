<template>
    <div>
        <el-page-header icon="" title="综合管理系统" content="首页" />
        <el-card style="max-width: 100%" class="box-card"> 
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="100" :src="store.userInfo.avatar"></el-avatar>
                </el-col>
                <el-col :span="20">
                    <h3 style="line-height: 100px;">欢迎回来:{{ store.userInfo.username }},{{ welcomeText }}</h3>
                </el-col>
            </el-row>
</el-card>
<el-card style="max-width: 100%" class="box-card">
    <template #header>
      <div class="card-header">
        <span style="font-weight: 900; font-size: 23px;">精品课程</span>
      </div>
    </template>
<el-carousel :interval="5000" type="card" height="200px">
    <el-carousel-item v-for="item in loopList" :key="item._id">
        <div :style="{
                    backgroundImage: `url(${item.cover})`,
                    backgroundSize: 'cover',
                }">
            <h3 text="2xl" justify="center">{{ item.name }}</h3>
        </div>
    </el-carousel-item>
</el-carousel>
</el-card>
</div>
</template>

<script setup>
import axios from 'axios';
import { useIndexStore } from '@/stores';
import { computed, onMounted, ref } from 'vue';
const store = useIndexStore()
const loopList = ref([])
const welcomeText = computed(() => new Date().getHours() < 12 ? '上午好,要开心每一天' : '下午好,喝杯咖啡提提神吧')
const getDateList = async () => {
    const res = await axios.get(`/adminApi/course/list${store.userInfo._id}`);
    loopList.value = res.data.data
}
onMounted(() => {
    getDateList()
})

</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 50px;
}

.el-carousel__item h3 {
    color: #000000;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
