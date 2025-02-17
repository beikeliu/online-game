<script setup lang="ts">
import { nextTick, onActivated, onMounted, ref } from 'vue';
import { List, Cell, Field, Button, Notify } from 'vant';
import dayjs from 'dayjs';
import { useIndexStore } from '@/store';

const store = useIndexStore();
const list = ref<{ username: string, message: string, timestamp: string }[]>([]);
const value = ref('');

const scrollToBottom = () => {
    nextTick(() => {
        const listElement = document.querySelector('.list');
        if (listElement) {
            listElement.scrollTop = listElement.scrollHeight;
        }
    });
};

onMounted(() => {
    store.socket.on('chat history', (msgs) => {
        list.value = msgs;
        scrollToBottom();
    });
    store.socket.on('chat message', (msg) => {
        list.value.push(msg);
        scrollToBottom();
    });
    store.socket.on('user count', (count) => {
        store.setUserCount(count);
    });
});

onActivated(() => {
    scrollToBottom();
});


const onSend = () => {
    store.socket.emit('chat message', { username: store.username, message: value.value });
    value.value = '';
};

</script>
<template>
    <Notify show type="primary">
        当前在线人数: {{ store.userCount }}
    </Notify>
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
                <Button size="small" type="primary" :disabled="!value" :style="{ width: '60px' }"
                    @click="onSend">发送</Button>
            </template>
        </Field>
    </div>
</template>
<style scoped>
.list {
    padding-top: 50px;
    height: calc(100vh - 170px);
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