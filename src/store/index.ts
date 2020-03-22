import Vue from "vue";
import Vuex from "vuex";
import $axios from "axios";
import { createDirectStore } from "direct-vuex";
import { playersModule } from "./players";
import { matchHistoryModule } from "./matchHistory";
import { playModule } from "./play";
import { matchMakerModule } from "./matchMaker";
import { IPlayerUpdate } from "@/store/players";
import { IMatch } from "@/store/matchHistory";

Vue.use(Vuex);
export const $http = $axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 15000,
});

export interface GlobalModuleState {
    showAddDialog: boolean;
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
        postMatch: async (context, payload: IMatch) => {
            await $http.post("matchHistory.json", {
                ...payload,
                timestamp: new Date(),
            });
        },
        postUser: async (context, payload: IPlayerUpdate) => {
            return await $http.post(`user.json`, {
                player: payload.player,
                elo: payload.elo,
                hidden: payload.hidden,
            });
        },
        putUser: async (context, payload: IPlayerUpdate) => {
            await $http.put(`user/${payload.id}.json`, {
                player: payload.player,
                elo: payload.elo,
                hidden: payload.hidden,
            });
        },
        addNewUser: ({ dispatch }, val: string) => {
            return dispatch("postUser", {
                player: val,
                elo: 1200,
                hidden: false,
            } as IPlayerUpdate);
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
