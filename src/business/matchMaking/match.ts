import { Player } from './player';
import { IPlayers as IPlayerData } from '@/store/players';

export interface IMatch {
    player1Id: string;
    player2Id: string;
    priority: number;
}
export class Match implements IMatch {
    player1Id: string;
    player2Id: string;
    priority: number;
    ratingDifferential: number;
    constructor(playerData: IPlayerData)
    constructor(playerData: IPlayerData, player1: Player, player2: Player)
    constructor(private playerData: IPlayerData, player1?: Player, player2?: Player) {
        this.player1Id = player1?.id || "";
        this.player2Id = player2?.id || "";
        this.priority = (player1?.gamesPlayed || 0) + (player2?.gamesPlayed || 0);
        this.ratingDifferential = !this.player1Id || !this.player2Id ? 0 :
            Math.abs(playerData[this.player1Id].elo - playerData[this.player2Id].elo);
    }
    getMatchRating() {
        return this.playerData[this.player1Id].elo + this.playerData[this.player2Id].elo;
    }
    copy() {
        const copy = new Match(this.playerData);
        copy.player1Id = this.player1Id;
        copy.player2Id = this.player2Id;
        copy.priority = this.priority;
        copy.ratingDifferential = this.ratingDifferential;
        return copy;
    }
}