import { IStat, IStatsData } from './stats';
import RecordedMatch from '../data/recordedMatch';

interface IMaxRatingStat extends IStat {
    opponentId?: string;
    elo?: number;
    timestamp?: Date;
}

export default class MaxRating {
    private bestWinMatch?: RecordedMatch;
    private worstLossMatch?: RecordedMatch | null;
    constructor(private statsData: IStatsData) { }
    get win(): IMaxRatingStat {
        return {
            hasStat: !!this.bestWinMatch,
            opponentId: this.bestWinMatch?.getOpponent(this.statsData.playerFilterId),
            elo: this.bestWinMatch?.getOpponentElo(this.statsData.playerFilterId),
            timestamp: this.bestWinMatch?.timestamp
        }
    }
    get loss() {
        return {
            hasStat: !!this.worstLossMatch,
            opponentId: this.worstLossMatch?.getOpponent(this.statsData.playerFilterId),
            elo: this.worstLossMatch?.getOpponentElo(this.statsData.playerFilterId),
            timestamp: this.worstLossMatch?.timestamp
        } as IMaxRatingStat
    }
    feedStat(match: RecordedMatch) {
        if (!this.statsData.playerFilterId || this.statsData.opponentFilterId) return;
        if (match.isWinner(this.statsData.playerFilterId)) {
            const bestElo = this.bestWinMatch?.getOpponentElo(this.statsData.playerFilterId);
            const candidateElo = match.getOpponentElo(this.statsData.playerFilterId);
            if (!bestElo || (candidateElo && candidateElo > bestElo)) {
                this.bestWinMatch = match;
            }
        } else {
            const worstElo = this.worstLossMatch?.getOpponentElo(this.statsData.playerFilterId);
            const candidateElo = match.getOpponentElo(this.statsData.playerFilterId);
            if (!worstElo || (candidateElo && candidateElo < worstElo)) {
                this.worstLossMatch = match;
            }
        }
    }
}