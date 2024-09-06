<template>
    <div>
    <el-upload class="avatar-uploader"
         action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" 
        :auto-upload="false"
        :on-change="handChange">
        <img v-if="props.avatar" :src="props.avatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
    </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue';
const props = defineProps({
    avatar: String
})
const emit = defineEmits(['updateAvatar'])


//图片选择完之后的回调
const handChange = (file) => {
    // userForm.avatar = URL.createObjectURL(file.raw);
    // userForm.file = file.raw;
    emit('updateAvatar', file.raw)
}
</script>

<style lang="scss" scoped>
:deep(.el-upload) {
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
    border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
}
</style>