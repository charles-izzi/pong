import { IStat } from './stats';
import RecordedMatch from '../data/recordedMatch';

interface IMaxRatingStat extends IStat {
    hasStat: boolean;
    opponentId?: string;
    elo?: number;
    timestamp?: Date;
}

export default class MaxRating {
    private bestWinMatch?: RecordedMatch;
    private worstLossMatch?: RecordedMatch | null;
    private playerId?: string;
    get win(): IMaxRatingStat {
        return {
            hasStat: !!this.bestWinMatch,
            opponentId: this.bestWinMatch?.getOpponent(this.playerId),
            elo: this.bestWinMatch?.getOpponentElo(this.playerId),
            timestamp: this.bestWinMatch?.timestamp
        }
    }
    get loss() {
        return {
            hasStat: !!this.worstLossMatch,
            opponentId: this.worstLossMatch?.getOpponent(this.playerId),
            elo: this.worstLossMatch?.getOpponentElo(this.playerId),
            timestamp: this.worstLossMatch?.timestamp
        } as IMaxRatingStat
    }
    feedStat(match: RecordedMatch, playerId?: string, opponentId?: string) {
        if (!playerId || opponentId) return;
        this.playerId = playerId;
        if (match.isWinner(this.playerId)) {
            const bestElo = this.bestWinMatch?.getOpponentElo(this.playerId);
            const candidateElo = match.getOpponentElo(this.playerId);
            if (!bestElo || (candidateElo && candidateElo > bestElo)) {
                this.bestWinMatch = match;
            }
        } else {
            const worstElo = this.worstLossMatch?.getOpponentElo(this.playerId);
            const candidateElo = match.getOpponentElo(this.playerId);
            if (!worstElo || (candidateElo && candidateElo < worstElo)) {
                this.worstLossMatch = match;
            }
        }
    }
}