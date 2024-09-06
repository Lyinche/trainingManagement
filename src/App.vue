<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
    <RouterView />
</template>

<style scoped>
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    position: absolute;
}

::-webkit-scrollbar-thumb {
    background: #1890ff;
}

::-webkit-scrollbar-track {
    background: #ddd;
}
</style>
