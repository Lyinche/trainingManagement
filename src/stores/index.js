import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useIndexStore = defineStore(
    'indexStore',
    () => {
        //折叠状态
        let isCollapse = ref(false);
        //用户信息
        let userInfo = ref({});
        const changeUserInfo = value => {
            userInfo.value = value;
        };
        return {
            isCollapse,
            userInfo,
            changeUserInfo,
        };
    },
    {
        persist: true,
    }
);
