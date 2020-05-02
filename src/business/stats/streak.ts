import RecordedMatch from '../data/recordedMatch';
import { IStat, IStatsData } from './stats';

interface IStreakStat extends IStat {
    stat: number;
}

export default class Streak {
    win: IStreakStat = { stat: 0, hasStat: false };
    lose: IStreakStat = { stat: 0, hasStat: false };
    private curStreak = 0;
    private curStreakIsWin = true;

    constructor(private statsData: IStatsData) { }


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    feedStat(match: RecordedMatch) {
        if (!this.statsData.playerFilterId) return;

        if (match.isWinner(this.statsData.playerFilterId)) {
            this.win.hasStat = true;
            if (this.curStreakIsWin) {
                this.curStreak++;
            } else {
                this.curStreak = 1;
                this.curStreakIsWin = true;
            }
            this.win.stat = Math.max(this.win.stat, this.curStreak);
        } else {
            this.lose.hasStat = true;
            if (!this.curStreakIsWin) {
                this.curStreak++;
            } else {
                this.curStreak = 1;
                this.curStreakIsWin = false;
            }
            this.lose.stat = Math.max(this.lose.stat, this.curStreak);
        }
    }
}