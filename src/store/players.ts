import { $http, moduleActionContext } from ".";
import { defineModule } from "direct-vuex";
import Player, { IPlayer } from "@/business/data/player";
import Players from "@/business/data/players";

export interface PlayersModuleState {
    players: Players;
    rankedPlayers: string[];
    selectedPlayers: string[];
}

export interface IDropdown {
    text: string | number | object;
    value: string | number | object;
}

export interface IPlayersData {
    [key: string]: IPlayer;
}

export const playersModule = defineModule({
    namespaced: true,
    state: (): PlayersModuleState => {
        return {
            players: new Players(),
            rankedPlayers: [],
            selectedPlayers: [],
        };
    },
    getters: {
        onePlayerSelected: state => state.selectedPlayers.length === 1,
        twoPlayersSelected: state => state.selectedPlayers.length === 2,
        moreThanTwoPlayersSelected: state => state.selectedPlayers.length > 2,
        manyPlayersSelected: state => state.selectedPlayers.length > 2,
        isPlayerSelected: state => (id: string) =>
            state.selectedPlayers.includes(id),
        player: state => (id: string) => state.players.hash[id],
        playerByName: state => (name: string) =>
            Object.keys(state.players.hash || {}).find(
                x =>
                    state.players.hash[x].player.toLowerCase() ===
                    name.toLowerCase()
            ),
    },
    mutations: {
        commitPlayers: state => {
            state.rankedPlayers = Object.keys(state.players.hash).sort(
                (a: string, b: string) => {
                    return state.players.hash[a].elo < state.players.hash[b].elo
                        ? 1
                        : -1;
                }
            );
            state.rankedPlayers.forEach(
                (x: string, index: number) =>
                    (state.players.hash[x].rank = index + 1)
            );
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
    },
    actions: {
        fetchPlayers: async context => {
            const { state, commit } = playersActionContext(context);
            state.players = new Players(
                (await $http.get("/user.json")).data as IPlayersData
            );
            commit.commitPlayers();
        },
        updatePlayer: async (context, player: Player) => {
            const { state, commit, rootDispatch } = playersActionContext(
                context
            );
            await rootDispatch.putUser(player);
            state.players.updatePlayer(player);
            commit.commitPlayers();
        },
        addPlayer: async (context, val: string) => {
            const { state, commit, rootDispatch } = playersActionContext(
                context
            );

            const newPlayerUpdate = {
                player: val,
                elo: 1200,
                hidden: false,
            };
            const newPlayerId = (await rootDispatch.postUser(newPlayerUpdate))
                .data.name;
            state.players.addPlayer(
                new Player({ id: newPlayerId, rank: -1, ...newPlayerUpdate })
            );
            commit.commitPlayers();
        },
        selectPlayer: (context, id) => {
            const { getters, commit } = playersActionContext(context);
            if (getters.isPlayerSelected(id)) {
                commit.removeSelectedPlayer(id);
                return;
            }
            commit.addSelectedPlayer(id);
        },
    },
});

//direct-vuex - used for typing on vuex getters, mutations and actions
const playersActionContext = (context: any) =>
    moduleActionContext(context, playersModule);
