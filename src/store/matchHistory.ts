import { $http, moduleActionContext } from ".";
import { defineModule } from "direct-vuex";

export interface MatchHistoryModuleState {
    matches: IMatches;
    matchesFilter: IMatchesFilter;
    showDeleteMatchDialog: boolean;
    deleteMatchKey: string;
}

export interface IMatches {
    [key: string]: IMatch;
}

export interface IMatch {
    player1Name: string;
    player2Name: string;
    player1Wins: boolean;
    player1Elo: number;
    player2Elo: number;
    eloChange: number;
    timestamp: Date;
}

export interface IMatchesFilter {
    playerName: string;
    opponentName?: string;
}

export const matchHistoryModule = defineModule({
    namespaced: true,
    state: (): MatchHistoryModuleState => {
        return {
            matches: {} as IMatches,
            matchesFilter: {} as IMatchesFilter,
            showDeleteMatchDialog: false,
            deleteMatchKey: "",
        };
    },
    getters: {
        match: state => (id: string) => state.matches[id],
        filteredMatches: state =>
            Object.keys(state.matches)
                .filter((x: string) => {
                    const match = state.matches[x];
                    return (
                        !state.matchesFilter.playerName ||
                        ((state.matchesFilter.playerName ===
                            match.player1Name ||
                            state.matchesFilter.playerName ===
                            match.player2Name) &&
                            (!state.matchesFilter.opponentName ||
                                state.matchesFilter.opponentName ===
                                match.player1Name ||
                                state.matchesFilter.opponentName ===
                                match.player2Name))
                    );
                })
                .sort((a: string, b: string) => {
                    return state.matches[a].timestamp <
                        state.matches[b].timestamp
                        ? 1
                        : -1;
                }),
    },
    mutations: {
        setMatches: (state, matches: IMatches) => {
            state.matches = matches;
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
        fetchMatches: async context => {
            const { commit } = matchHistoryActionContext(context);
            commit.setMatches(
                (await $http.get("/matchHistory.json")).data as IMatches
            );
        },
        deleteMatch: async (context, matchKey: string) => {
            await $http.delete(`matchHistory/${matchKey}.json`);
        },
        removeMatch: (context, matchKey: string) => {
            const {
                dispatch,
                state,
                commit,
                getters,
                rootGetters,
                rootDispatch,
            } = matchHistoryActionContext(context);
            dispatch.deleteMatch(matchKey);
            const match = getters.match(matchKey);

            const player1Id = rootGetters.players.playerByName(
                match.player1Name
            );
            const player2Id = rootGetters.players.playerByName(
                match.player2Name
            );
            if (!player1Id || !player2Id) return;

            const player1 = rootGetters.players.player(player1Id);
            player1.elo += match.player1Wins
                ? match.eloChange * -1
                : match.eloChange;
            const player2 = rootGetters.players.player(player2Id);
            player2.elo += match.player1Wins
                ? match.eloChange
                : match.eloChange * -1;

            rootDispatch.putUser({ id: player1Id, ...player1 });
            rootDispatch.putUser({ id: player2Id, ...player2 });
            delete state.matches[matchKey];
            commit.setMatches({ ...state.matches });
        },
    },
});

//direct-vuex - used for typing on vuex getters, mutations and actions
const matchHistoryActionContext = (context: any) =>
    moduleActionContext(context, matchHistoryModule);
