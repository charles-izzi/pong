import { Match } from './match';
import { Player } from './player';

export class PotentialMatches {
    matches: Match[];
    oddPlayer: Player | null;
    constructor(oddPlayer: Player | null) {
        this.matches = [];
        this.oddPlayer = oddPlayer || null;
    }

    get totalRatingDifferential() {
        return this.matches.reduce((acc: number, cur: Match) => {
            return acc += cur.ratingDifferential;
        }, 0);
    }

    add(match: Match) {
        this.matches.push(match.copy());
    }

    copy(): PotentialMatches {
        const copy = new PotentialMatches(this.oddPlayer ? new Player(this.oddPlayer.id, this.oddPlayer.gamesPlayed, this.oddPlayer.playersPlayed, this.oddPlayer.isActive) : null);
        for (let i = 0; i < this.matches.length; i++) {
            copy.add(this.matches[i])
        }
        return copy;
    }
}