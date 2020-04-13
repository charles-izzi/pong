import Player from './player';

export interface IPlayers {
    [key: string]: Player;
}

export default class Players {
    private _hash: IPlayers = {};
    private _list: Player[] = [];
    constructor()
    constructor(players: IPlayers)
    constructor(players?: IPlayers) {
        if (!players) return;
        Object.keys(players).forEach(x => {
            const player = new Player({ id: x, ...players[x] });
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

    getName(playerId: string) {
        return this.hash[playerId].player;
    }
}