<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Dialog, Field, Notify, Tabbar, TabbarItem } from 'vant';
import Chat from './components/chat/Chat.vue';
import Apps from './components/apps/Apps.vue';
import User from './components/user/User.vue';
import { io } from 'socket.io-client';

const active = ref(0);
// const socket = io('http://localhost:3000');
const socket = io('http://113.44.241.178:3000');
const showInit = ref(false);
const username = ref("");
const userCount = ref(0);
const showNotify = ref(false);

onMounted(() => {
  const localUsername = localStorage.getItem('username');
  if (localUsername) {
    username.value = localUsername;
    // socket.emit('join user', { username: localUsername });
  } else {
    showInit.value = true;
  }
  socket.on('user count', (count) => {
    showNotify.value = true;
    userCount.value = count;
  });
});

const beforeClose = () => {
  if (username.value) {
    localStorage.setItem('username', username.value);
    // socket.emit('join user', { username: username.value });
    return true;
  }
};

const onTabbarChange = (value: number) => {
  active.value = value;
  if (active.value === 0) {
    showNotify.value = true;
  } else {
    showNotify.value = false;
  }
};

const onNotifyClick = () => {

};
</script>

<template>
  <div class="app">
    <Notify v-model:show="showNotify" type="primary" @click="onNotifyClick">
      当前在线人数: {{ userCount }}
    </Notify>

    <Dialog v-model:show="showInit" title="您的昵称是？" :before-close="beforeClose">
      <Field v-model="username" placeholder="请输入" maxlength="12"></Field>
    </Dialog>

    <div v-show="active === 0">
      <Chat :socket="socket" :username="username" />
    </div>
    <div v-show="active === 1">
      <Apps />
    </div>
    <div v-show="active === 2">
      <User :username="username" />
    </div>

    <Tabbar v-model="active" safe-area-inset-bottom @change="onTabbarChange">
      <TabbarItem icon="chat-o">聊天室</TabbarItem>
      <TabbarItem icon="apps-o">游戏中心</TabbarItem>
      <TabbarItem icon="user-o">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  background-color: #eff2f5;
}
</style>
