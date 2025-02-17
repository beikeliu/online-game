<script setup lang="ts">
import { List, Cell, showConfirmDialog } from 'vant';
import { useIndexStore } from '@/store';
import VConsole from 'vconsole';
import { ref } from 'vue';

let vconsole: VConsole | null = null;
const isDebug = ref(false);
const store = useIndexStore();
const clearCache = () => {
    showConfirmDialog({
        title: '确定要清除缓存吗？',
        message: '清除缓存后，下次登陆会重新输入昵称',
    })
        .then(() => {
            localStorage.clear();
            location.reload();
        })
        .catch(() => {
            // on cancel
        });
}
const toggleDebug = () => {
    isDebug.value = !isDebug.value;
    if (vconsole) {
        vconsole.destroy();
        vconsole = null;
    } else {
        vconsole = new VConsole();
        vconsole.setSwitchPosition(0, 300);
    }

}
</script>
<template>
    <List>
        <Cell :title="`昵称：${store.username}`"></Cell>
        <!-- <Cell title="联系人"></Cell>
        <Cell title="积分排行"></Cell>
        <Cell title="好友动态"></Cell>
        <Cell title="反馈意见"></Cell> -->
        <Cell title="清除缓存" @click="clearCache"></Cell>
        <Cell :title="isDebug ? '关闭调试' : '启动调试'" @click="toggleDebug"></Cell>
    </List>
</template>
<style scoped></style>