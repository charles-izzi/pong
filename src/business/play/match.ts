import elo from '../play/elo';
import Player from '../data/player';
import { IRecordedMatch } from '../data/recordedMatch';

export default class {
    private eloChange = 0;
    private timestamp: Date | null = null;
    constructor(player1: Player, player2: Player)
    constructor(player1: Player, player2: Player, winnerId: string)
    constructor(public player1: Player, public player2: Player, public winnerId?: string) { }

    get player1Wins() {
        return this.player1.id === this.winnerId;
    }

    isPlayerWinner(id: string) {
        return id === this.winnerId;
    }

    play() {
        if (!this.winnerId || this.timestamp) return;

        this.timestamp = new Date();
        this.eloChange = elo.eloChange(
            this.player1.elo,
            this.player2.elo,
            this.player1Wins
        );

        this.player1.elo += (this.player1Wins ? 1 : -1) * this.eloChange;
        this.player2.elo += (this.player1Wins ? -1 : 1) * this.eloChange;
    }

    getMatchLog() {
        return {
            player1: this.player1.id,
            player2: this.player2.id,
            player1Wins: this.player1Wins,
            player1Elo: this.player1.elo,
            player2Elo: this.player2.elo,
            eloChange: this.eloChange,
            timestamp: this.timestamp,
        } as IRecordedMatch;
    }
}