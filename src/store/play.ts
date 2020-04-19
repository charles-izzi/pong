import { defineModule } from "direct-vuex";
import { moduleActionContext } from ".";
import Match from '@/business/play/match';

export interface PlayModuleState {
    play: IPlayDialog;
}

export interface IPlay {
    player1: string;
    player2: string;
    player1Wins: boolean;
}

export interface IPlayDialog {
    match: Match;
    showDialog?: boolean;
    callback?: () => void;
}

export const playModule = defineModule({
    namespaced: true,
    state: (): PlayModuleState => {
        return {
            play: { showDialog: false } as IPlayDialog,
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
    },
    actions: {
        play: async (context, match: Match) => {
            const { rootDispatch } = playActionContext(context);

            match.play();

            rootDispatch.matchHistory.addMatch(match.getMatchLog());
            rootDispatch.players.updatePlayer(match.player1);
            rootDispatch.players.updatePlayer(match.player2);
        },
        completeMatch: async context => {
            const { commit } = playActionContext(context);

            if (context.state.play.callback) context.state.play.callback();
            context.dispatch("play", context.state.play.match);
            commit.setPlay({ match: context.state.play.match });
        },
    },
});

//direct-vuex - used for typing on vuex getters, mutations and actions
const playActionContext = (context: any) =>
    moduleActionContext(context, playModule);
