<script setup lang="ts">
import { List, Cell } from 'vant';

const props = defineProps<{ username: string }>();
</script>
<template>
    <List>
        <Cell :title="`昵称：${props.username}`"></Cell>
        <Cell title="联系人"></Cell>
        <Cell title="积分排行"></Cell>
        <Cell title="好友动态"></Cell>
        <Cell title="反馈意见"></Cell>
    </List>
</template>
<style scoped></style>