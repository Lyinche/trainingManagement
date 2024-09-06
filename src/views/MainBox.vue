<template>
  <div >
    <el-container>
      <SideMenu />
      <el-container direction="vertical">
        <TopHeader />
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import TopHeader from "../components/mainBox/TopHeader.vue";
import SideMenu from "../components/mainBox/SideMenu .vue";



</script>

<style lang="scss" scoped>
.el-main {
  overflow: auto;
  //calc(多少减去多少剩下的)
  height: calc(100vh - 60px);
}
</style>
