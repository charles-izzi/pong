import { defineModule } from "direct-vuex";
import { moduleActionContext } from ".";
import Match from "@/business/play/match";

export interface PlayModuleState {
    play: IPlayDialog;
}

export interface IPlayDialog {
    match: Match;
    showDialog?: boolean;
    callback?: () => void;
    matchCount: number;
}

export const playModule = defineModule({
    namespaced: true,
    state: (): PlayModuleState => {
        return {
            play: { showDialog: false, matchCount: 1 } as IPlayDialog,
        };
    },
    mutations: {
        setWinner: (state, winner: string) => {
            state.play.match.winnerId = winner;
        },
        setShowPlayDialog: (state, val: boolean) => {
            state.play.showDialog = val;
        },
        setPlay: (state, val: IPlayDialog) => {
            state.play = val;
        },
        setMatchCount: (state, val: number) => {
            state.play.matchCount = val;
        },
    },
    actions: {
        play: async (context, match: Match) => {
            const { rootState, rootDispatch } = playActionContext(context);

            for (let i = 0; i < rootState.play.play.matchCount; i++) {
                await rootDispatch.players.fetchPlayers();
                match.play(rootState.players.players);

                rootDispatch.matchHistory.addMatch(match.getMatchLog());
                await rootDispatch.players.updatePlayer(match.player1);
                await rootDispatch.players.updatePlayer(match.player2);
            }
        },
        completeMatch: async context => {
            const { commit, rootState } = playActionContext(context);

            if (context.state.play.callback) context.state.play.callback();
            await context.dispatch("play", context.state.play.match);
            commit.setPlay({ match: rootState.play.play.match, matchCount: 1 });
        },
    },
});

//direct-vuex - used for typing on vuex getters, mutations and actions
const playActionContext = (context: any) =>
    moduleActionContext(context, playModule);
