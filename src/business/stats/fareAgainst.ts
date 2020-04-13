import { IStat } from './stats';
import RecordedMatch from '../data/recordedMatch';
import WinRate from './winRate';
import Players from '../data/players';
import elo from '../play/elo';

interface IWinRates {
    [key: string]: WinRate;
}

interface IFare {
    opponentId: string;
    expected: number;
    actual: number;
}

export default class FareAgainst implements IStat {

    fares: IFare[] = [];
    actualRatesByOpponent = {} as IWinRates;
    private playerId = "";
    constructor(private playerData: Players, private strongAgainst: boolean) { }

    get hasStat() {
        return !!this.fares.length;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    feedStat(match: RecordedMatch, playerFilterId?: string, opponentFilterId?: string) {
        if (!playerFilterId) return;
        this.playerId = playerFilterId;

        const matchOpponent = match.getOpponent(playerFilterId);
        if (!matchOpponent) return;

        if (!Object.hasOwnProperty.call(this.actualRatesByOpponent, matchOpponent)) {
            this.actualRatesByOpponent[matchOpponent] = new WinRate();
        }

        this.actualRatesByOpponent[matchOpponent].feedStat(match, playerFilterId, matchOpponent);
    }

    calculateFares() {
        //form a list of all opponents and their expected and actual win rates
        const actualRatesKeys = Object.keys(this.actualRatesByOpponent);
        for (let i = 0; i < actualRatesKeys.length; i++) {
            const expectedWinRate = this.getExpectedWinPercentage(this.playerData.hash[this.playerId].elo, this.playerData.hash[actualRatesKeys[i]].elo);
            const actualWinRate = this.actualRatesByOpponent[actualRatesKeys[i]].winRate;
            const moreThanOneGamePlayed = this.actualRatesByOpponent[actualRatesKeys[i]].totalCount > 1;
            if (moreThanOneGamePlayed &&
                ((this.strongAgainst && expectedWinRate < actualWinRate) ||
                    (!this.strongAgainst && expectedWinRate > actualWinRate))) {
                this.fares.push({
                    opponentId: actualRatesKeys[i],
                    expected: expectedWinRate,
                    actual: actualWinRate
                });
            }
        }
        //sort that list by the greatest difference between expected and actual
        this.fares.sort((a, b) => {
            if (this.strongAgainst) {
                if ((a.actual - a.expected) > (b.actual - b.expected)) return -1;
                return 1;
            } else {
                if ((a.actual - a.expected) > (b.actual - b.expected)) return 1;
                return -1;
            }
        });
        //take top 3 (for ux reasons)
        this.fares = this.fares.slice(0, 3);
    }

    private getExpectedWinPercentage(eloA: number, eloB: number) {
        return Math.round(elo.expectedWinRate(eloA, eloB) * 100);
    }
}