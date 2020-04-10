import Vue from "vue";
import Vuex from "vuex";
import $axios from "axios";
import { createDirectStore } from "direct-vuex";
import { playersModule } from "./players";
import { matchHistoryModule } from "./matchHistory";
import { playModule } from "./play";
import { matchMakerModule } from "./matchMaker";
import Player from "@/business/data/player";
import { IRecordedMatch } from '@/business/data/recordedMatch';

Vue.use(Vuex);
export const $http = $axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 15000,
});

export interface GlobalModuleState {
    showAddDialog: boolean;
}

export interface IPlayerUpdate {
    player: string;
    elo: number;
    hidden: boolean;
}

const {
    store,
    rootActionContext,
    moduleActionContext,
    rootGetterContext,
    moduleGetterContext,
} = createDirectStore({
    modules: {
        players: playersModule,
        play: playModule,
        matchHistory: matchHistoryModule,
        matchMaker: matchMakerModule,
    },
    state: (): GlobalModuleState => {
        return {
            showAddDialog: false,
        };
    },
    getters: {},
    mutations: {
        setShowAddDialog: (state, val: boolean) => {
            state.showAddDialog = val;
        },
    },
    actions: {
        postMatch: (context, payload: IRecordedMatch) => {
            return $http.post("matchHistory.json", {
                ...payload
            });
        },
        postUser: (context, payload: IPlayerUpdate) => {
            return $http.post(`user.json`, {
                player: payload.player,
                elo: payload.elo,
                hidden: payload.hidden,
            });
        },
        putUser: (context, payload: Player) => {
            return $http.put(`user/${payload.id}.json`, {
                player: payload.player,
                elo: payload.elo,
                hidden: payload.hidden,
            });
        },
    },
});
// Export the direct-store instead of the classic Vuex store.
export default store;
// The following exports will be used to enable types in the
// implementation of actions.
export {
    rootActionContext,
    moduleActionContext,
    rootGetterContext,
    moduleGetterContext,
};

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store;
declare module "vuex" {
    interface Store<S> {
        direct: AppStore;
    }
}
