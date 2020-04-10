export interface IPlayer {
    id: string;
    player: string;
    elo: number;
    rank: number;
    hidden: boolean;
}

export default class Player implements IPlayer {
    id: string;
    player: string;
    elo: number;
    rank: number;
    hidden: boolean;
    constructor(player: IPlayer) {
        this.id = player.id;
        this.player = player.player;
        this.elo = player.elo;
        this.rank = player.rank;
        this.hidden = player.hidden;
    }
}