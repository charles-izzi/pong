import Vue from "vue";
import Vuex from "vuex";
import $axios from "axios";
import elo from '@/business/elo';
import { IPlayer, IPlayers, IMatch, IPlayerUpdate } from '@/business/playModel';

Vue.use(Vuex);
const $http = $axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 15000,
});

export default new Vuex.Store({
    state: {
        players: {} as IPlayers,
        selectedPlayers: [] as string[],
        winner: "",
        showAddDialog: false,
        showPlayDialog: false,
    },
    getters: {
        noPlayersSelected: state => {
            return state.selectedPlayers.length === 0;
        },
        onePlayerSelected: state => {
            return state.selectedPlayers.length === 1;
        },
        twoPlayersSelected: state => {
            return state.selectedPlayers.length === 2;
        },
        manyPlayersSelected: state => {
            return state.selectedPlayers.length > 2;
        },
        isPlayerSelected: state => (id: string) => {
            return state.selectedPlayers.find(x => x === id) !== undefined;
        },
        isPlayerWinner: state => (id: string) => {
            return state.winner === id;
        },
        player: state => (id: string) => {
            return state.players[id];
        },
        playerByName: state => (name: string) => {
            return Object.keys(state.players || {}).find(x => state.players[x].player.toLowerCase() === name.toLowerCase());
        }
    },
    mutations: {
        setPlayer: (state, player: IPlayerUpdate) => {
            state.players[player.id] = { player: player.player, elo: player.elo, hidden: player.hidden } as IPlayer;
        },
        setPlayers: (state, players: IPlayers) => {
            state.players = players;
        },
        removeFirstSelection: state => {
            state.selectedPlayers.splice(0, 1);
        },
        removeSelectedPlayer: (state, id: string) => {
            state.selectedPlayers.splice(state.selectedPlayers.indexOf(id), 1);
        },
        resetSelection: state => {
            state.selectedPlayers = [];
        },
        addSelectedPlayer: (state, id: string) => {
            state.selectedPlayers.push(id);
        },
        setWinner: (state, winner: string) => {
            state.winner = winner;
        },
        setShowAddDialog: (state, val: boolean) => {
            state.showAddDialog = val;
        },
        setShowPlayDialog: (state, val: boolean) => {
            state.showPlayDialog = val;
        }
    },
    actions: {
        fetchPlayers: async ({ commit }) => {
            commit('setPlayers', (await $http.get("/user.json")).data as IPlayers);
        },
        selectPlayer: ({ getters, commit }, id) => {
            if (getters.isPlayerSelected(id)) {
                commit('removeSelectedPlayer', id);
                return;
            }
            if (getters.twoPlayersSelected) commit('removeFirstSelection');
            commit('addSelectedPlayer', id);
        },
        setWinner: ({ commit }, id: string) => {
            commit('setWinner', id);
        },
        resetSelection: ({ commit }) => {
            commit('resetSelection');
        },
        play: async ({ state, getters, commit, dispatch }) => {
            let player1 = getters.player(state.selectedPlayers[0]) as IPlayer;
            let player2 = getters.player(state.selectedPlayers[1]) as IPlayer;
            const player1Wins = state.selectedPlayers[0] === state.winner;
            const eloChange = elo.eloChange(player1.elo, player2.elo, player1Wins);
            player1.elo += (player1Wins ? 1 : -1) * eloChange;
            player2.elo += (player1Wins ? -1 : 1) * eloChange;
            dispatch('postMatch', { player1: player1.player, player2: player2.player, player1Wins: player1Wins, eloChange });
            dispatch('putUser', { id: state.selectedPlayers[0], ...player1 });
            dispatch('putUser', { id: state.selectedPlayers[1], ...player2 });
            commit('setPlayer', { id: state.selectedPlayers[0], ...player1 });
            commit('setPlayer', { id: state.selectedPlayers[1], ...player2 });
            return eloChange;
        },
        postMatch: async (context, payload: IMatch) => {
            await $http.post("matchHistory.json", payload);
        },
        postUser: async (context, payload: IPlayerUpdate) => {
            return await $http.post(`user.json`, {
                player: payload.player,
                elo: payload.elo,
                hidden: payload.hidden
            });
        },
        putUser: async (context, payload: IPlayerUpdate) => {
            await $http.put(`user/${payload.id}.json`, {
                player: payload.player,
                elo: payload.elo,
                hidden: payload.hidden
            });
        },
        setShowAddDialog: ({ commit }, val: boolean) => {
            commit('setShowAddDialog', val);
        },
        addNewUser: ({ dispatch }, val: string) => {
            return dispatch('postUser', {
                player: val,
                elo: 1200,
                hidden: false
            } as IPlayerUpdate);
        },
        setShowPlayDialog: ({ commit }, val: boolean) => {
            commit('setShowPlayDialog', val);
        },
    },
    modules: {}
});