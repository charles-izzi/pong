import { MatchMaker } from "@/business/matchMaking/matchMaker";
import { Match } from "@/business/matchMaking/match";
import { defineModule } from "direct-vuex";
import { moduleActionContext } from ".";

export interface MatchMakerModuleState {
    matchMaker: MatchMaker;
    activeMatches: Match[];
}

export const matchMakerModule = defineModule({
    namespaced: true,
    state: (): MatchMakerModuleState => {
        return {
            matchMaker: {} as MatchMaker,
            activeMatches: [],
        };
    },
    getters: {},
    mutations: {
        setMatchMaker: (state, val: MatchMaker) => {
            state.matchMaker = val;
        },
        setActiveMatches: (state, val: Match[]) => {
            state.activeMatches = val;
        },
    },
    actions: {
        loadMatchMaker: async (context, reset: boolean) => {
            const { state, commit, rootState } = matchMakerActionContext(
                context
            );
            if (!Object.keys(state.matchMaker).length || reset) {
                commit.setMatchMaker(
                    new MatchMaker(rootState.players.players, 6)
                );
            } else {
                state.matchMaker.playerData = rootState.players.players;
            }
        },
        loadActiveMatches: context => {
            const { state, commit } = matchMakerActionContext(context);
            if (state.activeMatches.length < 2 && state.matchMaker.getMatches().length)
                commit.setActiveMatches(
                    state.matchMaker.getMatches().slice(0, 2)
                );
        },
        removeActiveMatch: (context, val: Match) => {
            const { state, commit } = matchMakerActionContext(context);
            commit.setActiveMatches(
                state.activeMatches.splice(state.activeMatches.indexOf(val), 1)
            );
        },
    },
});

//direct-vuex - used for typing on vuex getters, mutations and actions
const matchMakerActionContext = (context: any) =>
    moduleActionContext(context, matchMakerModule);
