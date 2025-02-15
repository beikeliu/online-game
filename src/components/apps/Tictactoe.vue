<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { showDialog } from "vant";

const props = defineProps<{onClickLeft: Function}>();

// const socket = ref(null);
const board = ref(Array(9).fill(null));
const playerId = ref(null);
const players = ref([]);
const currentTurn = ref("X");
const winner = ref(null);
const inGame = ref(false);

const isMyTurn = computed(() => {
    return inGame.value && players.value[currentTurn.value === "X" ? 0 : 1] === playerId.value;
});

const makeMove = (index: number) => {
    console.log(index);
    
    // if (isMyTurn.value && !board.value[index]) {
    //     socket.value.emit("makeMove", { index });
    // }
};

onMounted(() => {
    showDialog({ message: '正在开发中...', confirmButtonText: '被迫返回/(ㄒoㄒ)/~~' }).then(() => {
        props.onClickLeft();
    });

    // socket.value = io("http://localhost:3000");

    // socket.value.on("updateGame", (game) => {
    //     board.value = game.board;
    //     players.value = game.players;
    //     currentTurn.value = game.currentTurn;
    //     inGame.value = game.players.includes(socket.value.id);
    //     playerId.value = socket.value.id;
    // });

    // socket.value.on("gameOver", ({ winner: gameWinner }) => {
    //     winner.value = gameWinner;
    // });
});
</script>

<template>
    <div class="game">
        <h2 v-if="winner">{{ winner === 'Opponent disconnected' ? '对手断开连接' : `获胜者: ${winner}` }}</h2>
        <h2 v-else>当前玩家: {{ isMyTurn ? "你的回合" : "对方回合" }}</h2>
        <div class="board">
            <div v-for="(cell, index) in board" :key="index" class="cell" :class="{ disabled: !isMyTurn || cell }"
                @click="makeMove(index)">
                {{ cell }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.game {
    text-align: center;
}

.board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    margin: 20px auto;
    width: 300px;
    border: 1px solid black;
}

.cell {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border: 1px solid black;
    cursor: pointer;
}

.cell.disabled {
    pointer-events: none;
    opacity: 0.6;
}
</style>