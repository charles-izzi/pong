import RecordedMatches from '../data/recordedMatches';
import RecordedMatch from '../data/recordedMatch';
import WinRate from './winRate';

export interface IStat {
    readonly hasStat: boolean;
    feedStat: (match: RecordedMatch, playerId?: string, opponentId?: string) => void;
}

export default class Stats {
    private matches: RecordedMatch[] = [];
    winRate = new WinRate();
    constructor(matches: RecordedMatches)
    constructor(matches: RecordedMatches, playerId: string)
    constructor(matches: RecordedMatches, playerId: string, opponentId: string)
    constructor(matches: RecordedMatches, private playerId?: string, private opponentId?: string) {
        if (!playerId)
            this.matches = matches.list;
        else if (!opponentId) {
            this.matches = matches.getMatchesByPlayer(playerId);
        } else {
            this.matches = matches.getMatchesByPlayerAndOpponent(playerId, opponentId);
        }
        this.calculateStats();
    }

    private calculateStats() {
        for (let i = 0; i < this.matches.length; i++) {
            this.winRate.feedStat(this.matches[i], this.playerId, this.opponentId);
        }
    }
}