import { defineStore } from 'pinia'
import { io } from 'socket.io-client';
import { ref } from 'vue';

export const useIndexStore = defineStore('index', () => {
    const socket = io(':3000');
    const username = ref('');
    const userCount = ref(0);
    const setUsername = (name: string) => {
        username.value = name;
    }
    socket.on('user count', (count) => {
        userCount.value = count;
    });
    return { socket, username, setUsername, userCount };
})