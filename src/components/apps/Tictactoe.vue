<!-- <script setup lang="ts"></script> -->
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
<script>
import { io } from "socket.io-client";
import { showDialog } from "vant";

export default {
    props: {
        onClickLeft: Function,
    },
    data() {
        return {
            socket: null,
            board: Array(9).fill(null),
            playerId: null,
            players: [],
            currentTurn: "X",
            winner: null,
            inGame: false,
        };
    },
    computed: {
        isMyTurn() {
            return this.inGame && this.players[this.currentTurn === "X" ? 0 : 1] === this.playerId;
        },
    },
    methods: {
        // joinGame() {
        //     this.socket.emit("joinGame");
        // },
        // makeMove(index) {
        //     if (this.isMyTurn && !this.board[index]) {
        //         this.socket.emit("makeMove", { index });
        //     }
        // },
    },
    mounted() {
        showDialog({ message: '正在开发中...', confirmButtonText: '被迫返回/(ㄒoㄒ)/~~' }).then(() => {
            this.onClickLeft();
        });
        // this.socket = io("http://localhost:3000");

        // this.socket.on("updateGame", (game) => {
        //     this.board = game.board;
        //     this.players = game.players;
        //     this.currentTurn = game.currentTurn;
        //     this.inGame = game.players.includes(this.socket.id);
        //     this.playerId = this.socket.id;
        // });

        // this.socket.on("gameOver", ({ winner }) => {
        //     this.winner = winner;
        // });
    },
};
</script>

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