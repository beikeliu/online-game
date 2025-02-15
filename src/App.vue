<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Dialog, Field, Tabbar, TabbarItem } from 'vant';
import Chat from './components/chat/Chat.vue';
import Apps from './components/apps/Apps.vue';
import User from './components/user/User.vue';
import { io } from 'socket.io-client';

const active = ref(0);
const socket = io('http://localhost:3000');
const showInit = ref(false);
const username = ref("");
onMounted(() => {
  const localUsername = localStorage.getItem('username');
  if (localUsername) {
    username.value = localUsername;
    socket.emit('join user', { username: localUsername });
  } else {
    showInit.value = true;
  }
});
const beforeClose = () => {
  if (username.value) {
    localStorage.setItem('username', username.value);
    socket.emit('join user', { username: username.value });
    return true;
  }
};
</script>

<template>
  <div class="app">
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
      <User />
    </div>

    <Tabbar v-model="active" safe-area-inset-bottom>
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
