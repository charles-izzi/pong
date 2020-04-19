import RecordedMatches from '../data/recordedMatches';
import RecordedMatch from '../data/recordedMatch';
import WinRate from './winRate';
import FareAgainst from './fareAgainst';
import Players from '../data/players';

export interface IStat {
    readonly hasStat: boolean;
    feedStat?: (match: RecordedMatch, playerFilterId?: string, opponentFilterId?: string) => void;
}

export default class Stats {
    private matches: RecordedMatch[] = [];
    winRate = new WinRate();
    fareAgainst = new FareAgainst(this.playerData);
    constructor(playerData: Players, matches: RecordedMatches)
    constructor(playerData: Players, matches: RecordedMatches, playerFilterId: string)
    constructor(playerData: Players, matches: RecordedMatches, playerFilterId: string, opponentFilterId: string)
    constructor(private playerData: Players, matches: RecordedMatches, private playerFilterId?: string, private opponentFilterId?: string) {
        if (!playerFilterId)
            this.matches = matches.list;
        else if (!opponentFilterId) {
            this.matches = matches.getSortedMatchesByPlayer(playerFilterId);
        } else {
            this.matches = matches.getSortedMatchesByPlayerAndOpponent(playerFilterId, opponentFilterId);
        }
        this.calculateStats();
    }

    private calculateStats() {
        for (let i = 0; i < this.matches.length; i++) {
            this.winRate.feedStat(this.matches[i], this.playerFilterId, this.opponentFilterId);
            this.fareAgainst.feedStat(this.matches[i], this.playerFilterId, this.opponentFilterId);
        }
        this.fareAgainst.calculateFares();
    }
}