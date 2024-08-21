import elo from "../play/elo";
import Player from "../data/player";
import { IRecordedMatch } from "../data/recordedMatch";
import Players from "../data/players";

export default class Match {
    private eloChange = 0;
    private timestamp: Date | null = null;
    private player1OriginalElo = 0;
    private player2OriginalElo = 0;
    private totalEloChange = 0;
    player1: Player;
    player2: Player;

    constructor(player1: Player, player2: Player);
    constructor(player1: Player, player2: Player, winnerId: string);
    constructor(player1: Player, player2: Player, public winnerId?: string) {
        this.player1 = new Player(player1);
        this.player2 = new Player(player2);
        this.player1OriginalElo = this.player1.elo;
        this.player2OriginalElo = this.player2.elo;
    }

    get player1Wins() {
        return this.player1.id === this.winnerId;
    }

    isPlayerWinner(id: string) {
        return id === this.winnerId;
    }

    play(latestPlayerData: Players) {
        if (!this.winnerId) return;

        this.player1 = new Player({
            ...latestPlayerData.hash[this.player1.id],
        });
        this.player2 = new Player({
            ...latestPlayerData.hash[this.player2.id],
        });

        this.timestamp = new Date();
        this.eloChange = elo.eloChange(
            this.player1.elo,
            this.player2.elo,
            this.player1Wins
        );

        this.totalEloChange += this.eloChange;
        this.player1.elo += (this.player1Wins ? 1 : -1) * this.eloChange;
        this.player2.elo += (this.player1Wins ? -1 : 1) * this.eloChange;
    }

    getMatchLog() {
        return {
            player1: this.player1.id,
            player2: this.player2.id,
            player1Wins: this.player1Wins,
            player1Elo: this.player1OriginalElo,
            player2Elo: this.player2OriginalElo,
            eloChange: this.eloChange,
            timestamp: this.timestamp,
            totalEloChange: this.totalEloChange,
        } as IRecordedMatch;
    }
}
