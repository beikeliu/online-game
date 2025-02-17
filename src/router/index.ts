import { createMemoryHistory, createRouter } from 'vue-router'

import Chat from '@/components/chat/Chat.vue';
import Apps from '@/components/apps/Apps.vue';
import User from '@/components/user/User.vue';

export const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            redirect: '/chat',
        },
        {
            path: '/chat',
            component: Chat
        },
        {
            path: '/apps',
            component: Apps,
            children: [
                {
                    path: 'tictactoe',
                    component: () => import('../components/apps/Tictactoe.vue')
                }
            ]
        },
        {
            path: '/user',
            component: User
        },
    ],
})