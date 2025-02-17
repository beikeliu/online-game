<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Dialog, Field, Tabbar, TabbarItem } from 'vant';
import { RouterView } from 'vue-router';
import { useIndexStore } from './store';

const store = useIndexStore();
const active = ref(0);
const showInit = ref(false);
const username = ref('');

onMounted(() => {
  const localUsername = localStorage.getItem('username');
  if (localUsername) {
    store.setUsername(localUsername);
    store.socket.emit('join user', { username: localUsername });
  } else {
    showInit.value = true;
  }
  store.socket.on('user count', (count) => {
    store.setUserCount(count);
  });
});

const beforeClose = () => {
  if (username) {
    store.setUsername(username.value);
    localStorage.setItem('username', username.value);
    store.socket.emit('join user', { username: username.value });
    return true;
  }
};

</script>

<template>
  <div class="app">
    <Dialog v-model:show="showInit" title="您的昵称是？" :before-close="beforeClose">
      <Field v-model="username" placeholder="请输入" maxlength="12"></Field>
    </Dialog>

    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>

    <Tabbar v-model="active" safe-area-inset-bottom>
      <TabbarItem icon="chat-o" to="/chat">聊天室</TabbarItem>
      <TabbarItem icon="apps-o" to="/apps">游戏中心</TabbarItem>
      <TabbarItem icon="user-o" to="/user">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  background-color: #eff2f5;
}
</style>
