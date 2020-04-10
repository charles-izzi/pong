import { $http, moduleActionContext } from ".";
import { defineModule } from "direct-vuex";
import RecordedMatches, { IRecordedMatches } from '@/business/data/recordedMatches';
import RecordedMatch, { IRecordedMatch } from '@/business/data/recordedMatch';
import Player from '@/business/data/player';

export interface MatchHistoryModuleState {
    matches: RecordedMatches;
    deleteDialog: IDeleteDialog;
}

export interface IDeleteDialog {
    show: boolean;
    match: RecordedMatch;
}

export const matchHistoryModule = defineModule({
    namespaced: true,
    state: (): MatchHistoryModuleState => {
        return {
            matches: new RecordedMatches(),
            deleteDialog: {} as IDeleteDialog
        };
    },
    getters: {
        matchPlayer1: (state, getters, rootState) => (matchId: string) => {
            return rootState.players.players.hash[state.matches.hash[matchId].player1] as Player;
        },
        matchPlayer2: (state, getters, rootState) => (matchId: string) => {
            return rootState.players.players.hash[state.matches.hash[matchId].player2] as Player;
        },
    },
    mutations: {
        setMatches: (state, matches: RecordedMatches) => {
            state.matches = matches;
        },
        showDeleteDialog: (state, match: RecordedMatch) => {
            state.deleteDialog = {
                show: true,
                match: match
            }
        },
        closeDeleteDialog: state => {
            state.deleteDialog = {
                show: false,
                match: {} as RecordedMatch
            }
        }
    },
    actions: {
        fetchMatches: async context => {
            const { commit, rootState } = matchHistoryActionContext(context);
            commit.setMatches(new RecordedMatches(rootState.players.players, (await $http.get("/matchHistory.json")).data as IRecordedMatches));
        },
        addMatch: async (context, match: IRecordedMatch) => {
            const {
                rootDispatch,
            } = matchHistoryActionContext(context);
            await rootDispatch.postMatch(match)
        },
        deleteMatch: async (context, matchKey: string) => {
            await $http.delete(`matchHistory/${matchKey}.json`);
        },
        removeMatch: (context, matchKey: string) => {
            const {
                dispatch,
                state,
                commit,
                rootState,
                rootDispatch,
            } = matchHistoryActionContext(context);

            const match = state.matches.hash[matchKey];
            const matchPlayers = match.undoMatch(rootState.players.players);

            rootDispatch.players.updatePlayer(matchPlayers.player1);
            rootDispatch.players.updatePlayer(matchPlayers.player2);

            dispatch.deleteMatch(matchKey);
            state.matches.removeMatch(match);
            commit.setMatches(state.matches);
        },
    },
});

//direct-vuex - used for typing on vuex getters, mutations and actions
const matchHistoryActionContext = (context: any) =>
    moduleActionContext(context, matchHistoryModule);
