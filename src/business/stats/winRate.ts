import { IStat } from './stats';
import RecordedMatch from '../data/recordedMatch';

export default class WinRate implements IStat {
    winCount = 0;
    totalCount = 0;

    get hasStat() {
        return this.totalCount > 0;
    }

    get winRate() {
        return Math.round((this.winCount / this.totalCount) * 100)
    }

    get loseCount() {
        return this.totalCount - this.winCount;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    feedStat(match: RecordedMatch, playerFilterId?: string, opponentFilterId?: string) {
        if (!playerFilterId) return;
        if (match.isWinner(playerFilterId)) this.winCount++;
        this.totalCount++;
    }
}