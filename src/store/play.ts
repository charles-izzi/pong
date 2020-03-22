import elo from "@/business/elo";
import { defineModule } from "direct-vuex";
import { moduleGetterContext, moduleActionContext } from ".";
import { IPlayer } from "./players";
import { IMatch } from "./matchHistory";

export interface PlayModuleState {
    play: IPlayDialog;
}

export interface IPlay {
    player1: string;
    player2: string;
    player1Wins: boolean;
}

export interface IPlayDialog {
    player1: string;
    player2: string;
    winner: string;
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
    getters: {
        isPlayerWinner: state => (id: string) => state.play.winner === id,
    },
    mutations: {
        setWinner: (state, winner: string) => {
            state.play.winner = winner;
        },
        setShowPlayDialog: (state, val: boolean) => {
            state.play.showDialog = val;
        },
        setPlay: (state, val: IPlayDialog) => {
            state.play = val;
        },
    },
    actions: {
        play: async (context, match: IPlayDialog) => {
            const { rootCommit, rootGetters, rootDispatch } = playActionContext(
                context
            );
            let player1 = rootGetters.players.player(match.player1) as IPlayer;
            let player2 = rootGetters.players.player(match.player2) as IPlayer;
            const player1Wins = match.player1 === match.winner;
            const eloChange = elo.eloChange(
                player1.elo,
                player2.elo,
                player1Wins
            );
            var matchLog = {
                player1Name: player1.player,
                player2Name: player2.player,
                player1Wins: player1Wins,
                player1Elo: player1.elo,
                player2Elo: player2.elo,
                eloChange,
            } as IMatch;
            player1.elo += (player1Wins ? 1 : -1) * eloChange;
            player2.elo += (player1Wins ? -1 : 1) * eloChange;
            rootDispatch.postMatch(matchLog);
            rootDispatch.putUser({ id: match.player1, ...player1 });
            rootDispatch.putUser({ id: match.player2, ...player2 });
            rootCommit.players.setPlayer({ id: match.player1, ...player1 });
            rootCommit.players.setPlayer({ id: match.player2, ...player2 });
            rootCommit.players.rankPlayers();
            return eloChange;
        },
        completeMatch: async context => {
            const { commit } = playActionContext(context);

            if (context.state.play.callback) context.state.play.callback();
            const match = {
                player1: context.state.play.player1,
                player2: context.state.play.player2,
                winner: context.state.play.winner,
            };
            const eloChange = await context.dispatch("play", match);
            commit.setPlay(match);
            return eloChange;
        },
    },
});

//direct-vuex - used for typing on vuex getters, mutations and actions
const playGetterContext = (args: [any, any, any, any]) =>
    moduleGetterContext(args, playModule);
const playActionContext = (context: any) =>
    moduleActionContext(context, playModule);
