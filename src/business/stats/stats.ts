import RecordedMatches from '../data/recordedMatches';
import RecordedMatch from '../data/recordedMatch';
import WinRate from './winRate';
import FareAgainst from './fareAgainst';
import Players from '../data/players';
import Streak from './streak';
import MaxRating from './maxRating';
import RatingVsTime from './ratingVsTime';
import moment from 'moment';

export interface IStat {
    hasStat: boolean;
}

export interface IStatsData {
    playerData: Players;
    playerFilterId?: string;
    opponentFilterId?: string;
    matches: RecordedMatch[];
}

export default class Stats {
    private matches: RecordedMatch[] = [];
    winRate: WinRate;
    fareAgainst: FareAgainst;
    streak: Streak;
    maxRating: MaxRating;
    ratingVsTime: RatingVsTime;
    constructor(playerData: Players, matches: RecordedMatches)
    constructor(playerData: Players, matches: RecordedMatches, playerFilterId: string)
    constructor(playerData: Players, matches: RecordedMatches, playerFilterId: string, opponentFilterId: string)
    constructor(playerData: Players, matches: RecordedMatches, playerFilterId?: string, opponentFilterId?: string) {
        if (!playerFilterId)
            this.matches = matches.list;
        else if (!opponentFilterId) {
            this.matches = matches.getSortedMatchesByPlayer(playerFilterId);
        } else {
            this.matches = matches.getSortedMatchesByPlayerAndOpponent(playerFilterId, opponentFilterId);
        }
        const statsData: IStatsData = {
            playerData,
            playerFilterId,
            opponentFilterId,
            matches: this.matches
        };
        this.winRate = new WinRate(statsData);
        this.fareAgainst = new FareAgainst(statsData);
        this.streak = new Streak(statsData);
        this.maxRating = new MaxRating(statsData);
        this.ratingVsTime = new RatingVsTime(statsData);
        this.matches.sort((a, b) => moment(a.timestamp).isBefore(b.timestamp) ? -1 : 1);
        this.calculateStats();
    }

    private calculateStats() {
        for (let i = 0; i < this.matches.length; i++) {
            this.winRate.feedStat(this.matches[i]);
            this.fareAgainst.feedStat(this.matches[i]);
            this.streak.feedStat(this.matches[i]);
            this.maxRating.feedStat(this.matches[i]);
            this.ratingVsTime.feedStat(this.matches[i]);
        }
        this.fareAgainst.calculateFares();
    }
}