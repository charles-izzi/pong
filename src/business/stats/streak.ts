import RecordedMatch from '../data/recordedMatch';
import { IStat } from './stats';

interface IStreakStat extends IStat {
    stat: number;
    hasStat: boolean;
}

export default class Streak {
    win: IStreakStat = { stat: 0, hasStat: false };
    lose: IStreakStat = { stat: 0, hasStat: false };
    private curStreak = 0;
    private curStreakIsWin = true;


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    feedStat(match: RecordedMatch, playerFilterId?: string, opponentFilterId?: string) {
        if (!playerFilterId) return;

        if (match.isWinner(playerFilterId)) {
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