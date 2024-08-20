import Player from "./player";
import { IPlayersData } from "@/store/players";

export interface IPlayers {
    [key: string]: Player;
}

export default class Players {
    private _hash: IPlayers = {};
    private _list: Player[] = [];
    constructor();
    constructor(players: IPlayersData);
    constructor(players?: IPlayersData) {
        if (!players) return;
        Object.keys(players).forEach(x => {
            const player = new Player({ ...players[x], id: x });
            this._hash[x] = player;
            this._list.push(player);
        });
    }

    get hash() {
        return this._hash;
    }
    get list() {
        return this._list;
    }

    addPlayer(newPlayer: Player) {
        this._hash[newPlayer.id] = newPlayer;
        this._list.push(newPlayer);
    }

    updatePlayer(player: Player) {
        this._hash[player.id] = player;
        this._list.splice(
            this._list.findIndex(x => x.id === player.id),
            1,
            player
        );
    }

    getName(playerId: string) {
        return this.hash[playerId].player;
    }
}
