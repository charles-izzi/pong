import Vue from "vue";
import Vuex from "vuex";
import $axios from "axios";
import elo from '@/business/elo';
import { IPlayer, IPlayers, IMatch, IPlayerUpdate, IMatches, IMatchesFilter, IDropdown } from '@/business/playModel';

Vue.use(Vuex);
const $http = $axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 15000,
});

export default new Vuex.Store({
    state: {
        players: {} as IPlayers,
        matches: {} as IMatches,
        matchesFilter: {} as IMatchesFilter,
        rankedPlayers: [] as string[],
        selectedPlayers: [] as string[],
        winner: "",
        showAddDialog: false,
        showPlayDialog: false,
        showDeleteMatchDialog: false,
        deleteMatchKey: ""
    },
    getters: {
        players: state => {
            return state.players;
        },
        unselectedRankedPlayers: state => {
            return state.rankedPlayers.filter((x: string) => !state.selectedPlayers.includes(x));
        },
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
            return state.selectedPlayers.includes(id);
        },
        isPlayerWinner: state => (id: string) => {
            return state.winner === id;
        },
        player: state => (id: string) => {
            return state.players[id];
        },
        playerByName: state => (name: string) => {
            return Object.keys(state.players || {}).find(x => state.players[x].player.toLowerCase() === name.toLowerCase());
        },
        match: state => (id: string) => {
            return state.matches[id];
        },
        filteredMatches: state => {
            return Object.keys(state.matches).filter((x: string) => {
                const match = state.matches[x];
                return !state.matchesFilter.playerName ||
                    ((state.matchesFilter.playerName === match.player1Name ||
                        state.matchesFilter.playerName === match.player2Name) &&
                        (!state.matchesFilter.opponentName ||
                            state.matchesFilter.opponentName === match.player1Name ||
                            state.matchesFilter.opponentName === match.player2Name));
            }).sort((a: string, b: string) => {
                return state.matches[a].timestamp < state.matches[b].timestamp ? 1 : -1;
            });
        },
        dropdownPlayersList: state => {
            return Object.keys(state.players).map(k => state.players[k].player);
        }
    },
    mutations: {
        setPlayer: (state, player: IPlayerUpdate) => {
            state.players[player.id] = { player: player.player, elo: player.elo, hidden: player.hidden } as IPlayer;
        },
        setPlayers: (state, players: IPlayers) => {
            state.players = players;
        },
        rankPlayers: (state) => {
            state.rankedPlayers = Object.keys(state.players).sort((a: string, b: string) => {
                return state.players[a].elo < state.players[b].elo ? 1 : -1;
            });
            state.rankedPlayers.forEach((x: string, index: number) => state.players[x].rank = index + 1);
        },
        setMatches: (state, matches: IMatches) => {
            state.matches = matches;
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
        },
        setMatchesFilter: (state, matchFilter: IMatchesFilter) => {
            state.matchesFilter = matchFilter;
        },
        setShowDeleteMatchDialog: (state, val: boolean) => {
            state.showDeleteMatchDialog = val;
        },
        setDeleteMatchKey: (state, val: string) => {
            state.deleteMatchKey = val;
        },
    },
    actions: {
        setPlayer: ({ commit }, player: IPlayerUpdate) => {
            commit('setPlayer', player);
            commit('rankPlayers');
        },
        setPlayers: ({ commit }, players: IPlayers) => {
            commit('setPlayers', players);
            commit('rankPlayers');
        },
        fetchPlayers: async ({ dispatch }) => {
            dispatch('setPlayers', (await $http.get("/user.json")).data as IPlayers);
        },
        fetchMatches: async ({ commit }) => {
            commit('setMatches', (await $http.get("/matchHistory.json")).data as IMatches);
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
            dispatch('postMatch', { player1Name: player1.player, player2Name: player2.player, player1Wins: player1Wins, eloChange } as IMatch);
            dispatch('putUser', { id: state.selectedPlayers[0], ...player1 } as IPlayerUpdate);
            dispatch('putUser', { id: state.selectedPlayers[1], ...player2 } as IPlayerUpdate);
            commit('setPlayer', { id: state.selectedPlayers[0], ...player1 } as IPlayerUpdate);
            commit('setPlayer', { id: state.selectedPlayers[1], ...player2 } as IPlayerUpdate);
            commit('rankPlayers');
            return eloChange;
        },
        postMatch: async (context, payload: IMatch) => {
            await $http.post("matchHistory.json", { ...payload, timestamp: new Date() });
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
        setMatchesFilter: ({ commit }, matchFilter: IMatchesFilter) => {
            commit('setMatchesFilter', matchFilter);
        },
        setShowDeleteMatchDialog: ({ commit }, val: boolean) => {
            commit('setShowDeleteMatchDialog', val);
        },
        deleteMatch: async (context, matchKey: string) => {
            await $http.delete(`matchHistory/${matchKey}.json`);
        },
        removeMatch: ({ dispatch, state, commit, getters }, matchKey: string) => {
            dispatch('deleteMatch', matchKey);
            const match = getters.match(matchKey);
            const player1Id = getters.playerByName(match.player1Name);
            let player1 = getters.player(player1Id);
            player1.elo += match.player1Wins ? match.eloChange * -1 : match.eloChange;
            dispatch('putUser', { id: player1Id, ...player1 });
            const player2Id = getters.playerByName(match.player2Name);
            let player2 = getters.player(player2Id);
            player2.elo += match.player1Wins ? match.eloChange : match.eloChange * -1;
            dispatch('putUser', { id: player2Id, ...player2 });
            delete state.matches[matchKey];
            commit('setMatches', {...state.matches});
        },
        setDeleteMatchKey: ({commit}, id: string) => {
            commit('setDeleteMatchKey', id);
        },
    },
    modules: {}
});