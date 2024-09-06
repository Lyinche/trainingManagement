import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('RouterStore', () => {
    //路由的状态
    let isGetterRouter = ref(false);
    //改变路由状态
    const changeGetterRouter = value => {
        isGetterRouter = value;
    };
    return {
        isGetterRouter,
        changeGetterRouter,
    };
});
