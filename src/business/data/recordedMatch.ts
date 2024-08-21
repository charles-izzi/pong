import Players from "../data/players";
import Player from "./player";

interface IMatchPlayers {
    player1: Player;
    player2: Player;
}

export interface IRecordedMatch {
    player1: string;
    player2: string;
    player1Wins: boolean;
    player1Elo: number;
    player2Elo: number;
    eloChange: number;
    timestamp: Date;
    matchCount: number;
    totalEloChange?: number;
}

export default class RecordedMatch implements IRecordedMatch {
    player1: string;
    player2: string;
    player1Wins: boolean;
    player1Elo: number;
    player2Elo: number;
    eloChange: number;
    timestamp: Date;
    matchCount: number;
    constructor(public id: string, matchLog: IRecordedMatch) {
        this.player1 = matchLog.player1;
        this.player2 = matchLog.player2;
        this.player1Wins = matchLog.player1Wins;
        this.player1Elo = matchLog.player1Elo;
        this.player2Elo = matchLog.player2Elo;
        this.eloChange = matchLog.eloChange;
        this.timestamp = matchLog.timestamp;
        this.matchCount = matchLog.matchCount;
    }

    undoMatch(playerData: Players): IMatchPlayers {
        const player1 = { ...playerData.hash[this.player1] };
        const player2 = { ...playerData.hash[this.player2] };

        player1.elo += this.player1Wins ? this.eloChange * -1 : this.eloChange;
        player2.elo += this.player1Wins ? this.eloChange : this.eloChange * -1;
        this.eloChange = 0;

        return {
            player1,
            player2,
        };
    }

    isWinner(playerId: string) {
        return (
            (this.player1 === playerId && this.player1Wins) ||
            (this.player2 === playerId && !this.player1Wins)
        );
    }

    hasPlayer(playerId?: string) {
        return this.player1 === playerId || this.player2 === playerId;
    }

    getOpponent(playerId?: string) {
        if (!this.hasPlayer(playerId)) return undefined;
        if (playerId === this.player1) return this.player2;
        return this.player1;
    }

    getOpponentElo(playerId?: string) {
        if (!this.hasPlayer(playerId)) return undefined;
        if (playerId === this.player1) return this.player2Elo;
        return this.player1Elo;
    }

    getPlayerElo(playerId?: string) {
        if (!this.hasPlayer(playerId)) return undefined;
        if (playerId === this.player1) return this.player1Elo;
        return this.player2Elo;
    }
}
