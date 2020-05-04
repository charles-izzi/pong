import { IStat, IStatsData } from './stats';
import { ChartData } from "chart.js";
import RecordedMatch from '../data/recordedMatch';
import moment from 'moment';
import { SHORTEST_DATE_FORMAT } from '@/constants';

const MAX_DATA_POINTS = 20;

export default class RatingVsTime implements IStat {
    private i = 0;
    private increment = 1;
    private incrementValue = 0
    private labels: string[] = [];
    private data: number[] = [];
    get hasStat() {
        return !!this.data.length;
    }
    get chartData(): ChartData {
        return {
            labels: this.labels,
            datasets: [{
                data: this.data,
                label: "",
                fill: false,
                backgroundColor: "rgba(155, 215, 250, 0.4)",
                borderColor: "rgba(46, 53, 255, 0.7)",
                borderWidth: 1,
            }]
        }
    }
    constructor(private statsData: IStatsData) {
        // calculate the increment that would be needed to traverse the
        // matches range minus the 2 end points (first match, current elo)
        const maxPointsInc = (statsData.matches.length - 1) / (MAX_DATA_POINTS - 2);
        // if it's less than 1, we use all matches and therefore increment by 1
        this.increment = Math.max(this.increment, maxPointsInc);
    }

    feedStat(match: RecordedMatch) {
        if (!this.statsData.playerFilterId || this.statsData.opponentFilterId) return;
        if (Math.floor(this.incrementValue + .001) === this.i) {
            this.addStat(match);
            this.incrementValue += this.increment;
        } if (this.statsData.matches.length - 1 === this.i) {
            this.labels.push(moment(new Date()).format(SHORTEST_DATE_FORMAT));
            this.data.push(this.statsData.playerData.hash[this.statsData.playerFilterId].elo);
        }

        this.i++;
    }

    private addStat(match: RecordedMatch) {
        const playerElo = match.getPlayerElo(this.statsData.playerFilterId);
        if (!playerElo) return;
        this.labels.push(moment(match.timestamp).format(SHORTEST_DATE_FORMAT));
        this.data.push(playerElo);
    }
}