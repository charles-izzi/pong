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

interface IFareStat extends IStat {
    fares: IFare[];
}

const FARE_AGAINST_COUNT = 3;
const MIN_MATCH_PER_OPPONENT = 2;

export default class FareAgainst {

    private actualRatesByOpponent = {} as IWinRates;
    private fares: IFare[] = [];
    private playerId = "";
    constructor(private playerData: Players) { }

    get strong(): IFareStat {
        const fares = this.getTopFares(true);
        return {
            fares,
            hasStat: fares.length > 0
        };
    }

    get weak(): IFareStat {
        const fares = this.getTopFares(false);
        return {
            fares: fares,
            hasStat: fares.length > 0
        };
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
            const hasMinOpponentMatches = this.actualRatesByOpponent[actualRatesKeys[i]].totalCount >= MIN_MATCH_PER_OPPONENT;
            if (hasMinOpponentMatches) {
                this.fares.push({
                    opponentId: actualRatesKeys[i],
                    expected: expectedWinRate,
                    actual: actualWinRate
                });
            }
        }
        //sort that list by the greatest difference between expected and actual
        this.fares.sort((a, b) => {
            if ((a.actual - a.expected) > (b.actual - b.expected)) return -1;
            return 1;
        });
    }

    private getExpectedWinPercentage(eloA: number, eloB: number) {
        return Math.round(elo.expectedWinRate(eloA, eloB) * 100);
    }

    private getTopFares(strong: boolean) {
        const fares: IFare[] = [];
        for (let i = 0; i < FARE_AGAINST_COUNT && i < this.fares.length; i++) {
            const ix = strong ? i : this.fares.length - i - 1;
            if ((this.fares[ix].expected < this.fares[ix].actual && strong) ||
                (this.fares[ix].expected > this.fares[ix].actual && !strong)) {
                fares.push(this.fares[ix]);
            }
        }
        return fares;
    }
}