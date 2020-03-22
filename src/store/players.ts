import { $http, moduleActionContext, moduleGetterContext } from ".";
import { defineModule } from "direct-vuex";

export interface PlayersModuleState {
    players: IPlayers;
    rankedPlayers: string[];
    selectedPlayers: string[];
}

export interface IPlayer {
    player: string;
    elo: number;
    rank: number;
    hidden: boolean;
}

export interface IPlayers {
    [key: string]: IPlayer;
}

export interface IPlayerUpdate extends IPlayer {
    id: string;
}

export interface IDropdown {
    text: string | number | object;
    value: string | number | object;
}

export const playersModule = defineModule({
    namespaced: true,
    state: (): PlayersModuleState => {
        return {
            players: {} as IPlayers,
            rankedPlayers: [] as string[],
            selectedPlayers: [] as string[],
        };
    },
    getters: {
        players: state => state.players,
        rankedPlayers: state => state.rankedPlayers,
        noPlayersSelected: state => state.selectedPlayers.length === 0,
        onePlayerSelected: state => state.selectedPlayers.length === 1,
        twoPlayersSelected: state => state.selectedPlayers.length === 2,
        moreThanTwoPlayersSelected: state => state.selectedPlayers.length > 2,
        manyPlayersSelected: state => state.selectedPlayers.length > 2,
        isPlayerSelected: state => (id: string) =>
            state.selectedPlayers.includes(id),
        player: state => (id: string) => state.players[id],
        playerByName: state => (name: string) =>
            Object.keys(state.players || {}).find(
                x =>
                    state.players[x].player.toLowerCase() === name.toLowerCase()
            ),
        dropdownPlayersList: state =>
            Object.keys(state.players).map(k => state.players[k].player),
    },
    mutations: {
        setPlayer: (state, player: IPlayerUpdate) => {
            state.players[player.id] = {
                player: player.player,
                elo: player.elo,
                hidden: player.hidden,
            } as IPlayer;
        },
        setPlayers: (state, players: IPlayers) => {
            state.players = players;
        },
        rankPlayers: state => {
            state.rankedPlayers = Object.keys(state.players).sort(
                (a: string, b: string) => {
                    return state.players[a].elo < state.players[b].elo ? 1 : -1;
                }
            );
            state.rankedPlayers.forEach(
                (x: string, index: number) =>
                    (state.players[x].rank = index + 1)
            );
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
    },
    actions: {
        getPlayers: async context => {
            const { dispatch } = playersActionContext(context);
            if (!Object.keys(context.state.players).length)
                await dispatch.fetchPlayers();
            return context.state.players as IPlayers;
        },
        setPlayer: (context, player: IPlayerUpdate) => {
            const { commit } = playersActionContext(context);
            commit.setPlayer(player);
            commit.rankPlayers();
        },
        setPlayers: (context, players: IPlayers) => {
            const { commit } = playersActionContext(context);
            commit.setPlayers(players);
            commit.rankPlayers();
        },
        fetchPlayers: async context => {
            const { dispatch } = playersActionContext(context);
            dispatch.setPlayers(
                (await $http.get("/user.json")).data as IPlayers
            );
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
const playersGetterContext = (args: [any, any, any, any]) =>
    moduleGetterContext(args, playersModule);
const playersActionContext = (context: any) =>
    moduleActionContext(context, playersModule);
