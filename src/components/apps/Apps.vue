<script setup lang="ts">
import { List, Cell, NavBar } from 'vant';
import { ref } from 'vue';
import { appMap } from '@/utils/constant';
import Tictactoe from './Tictactoe.vue';

const index = ref(0);
const onClickLeft = () => {
    index.value = 0;
};
</script>
<template>
    <div>
        <NavBar :title="appMap[index]" :left-text="index === 0 ? undefined : '返回'" :left-arrow="index !== 0"
            @click-left="onClickLeft" />
        <div v-if="index === 1">
            <Tictactoe :onClickLeft="onClickLeft"/>
        </div>
        <div v-else>
            <List>
                <Cell title="井字棋" @click="() => { index = 1 }">2人/房</Cell>
            </List>
        </div>
    </div>
</template>
<style scoped></style>