<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { List, Cell, Field, Button } from 'vant';
import type { Socket } from 'socket.io-client';
import dayjs from 'dayjs';

const props = defineProps<{ socket: Socket, username: string }>();
onMounted(() => {
    props.socket.on('chat history', (msgs) => {
        list.value = msgs;
        nextTick(() => {
            const listElement = document.querySelector('.list');
            if (listElement) {
                listElement.scrollTop = listElement.scrollHeight;
            }
        });
    });
    props.socket.on('chat message', (msg) => {
        list.value.push(msg);
    });
});
const list = ref<{ username: string, message: string, timestamp: string }[]>([]);
const value = ref('');
const onSend = () => {
    props.socket.emit('chat message', { username: props.username, message: value.value });
    value.value = '';
};
</script>
<template>
    <div class="list">
        <List>
            <Cell v-for="item in list" :key="item.timestamp" :title="`${item.username}: ${item.message}`">
                {{ dayjs(item.timestamp).format('YYYY-MM-DD HH:mm:ss') }}
            </Cell>
        </List>
    </div>
    <div class="field">
        <Field v-model="value" placeholder="请输入" maxlength="100">
            <template #button>
                <Button size="small" type="primary" :style="{ width: '60px' }" @click="onSend">发送</Button>
            </template>
        </Field>
    </div>
</template>
<style scoped>
.list {
    height: calc(100vh - 50px - 64px);
    overflow-y: auto;
}

.field {
    position: fixed;
    bottom: calc(env(safe-area-inset-bottom, 0) + 50px);
    width: 100%;
    background-color: white;
    padding: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>