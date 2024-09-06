<template>
    <div id="MyEditor">
        
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import E from 'wangeditor'
const emit = defineEmits(['event'])
const props = defineProps({
    content: String
})

onMounted(() => {
    const editor = new E('#MyEditor')
    editor.config.height = 150
    //设置初始内容 &&有值执行后面 没有不执行

    editor.create()

    props.content && editor.txt.html(props.content)

    editor.config.onchange = function (newHtml) {
        emit('event', newHtml)
    };

})
</script>

<style lang="scss" scoped></style>