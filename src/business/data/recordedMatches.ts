import RecordedMatch, { IRecordedMatch } from './recordedMatch';
import Players from '@/business/data/players';
import Player from './player';
import { IRecordedMatchesData } from '@/store/matchHistory';

export interface IRecordedMatches {
    [key: string]: RecordedMatch;
}

export default class RecordedMatches {
    private _hash: IRecordedMatches = {};
    private _list: RecordedMatch[] = [];
    private playerData: Players = new Players();
    constructor()
    constructor(playerData: Players, matches: IRecordedMatchesData)
    constructor(playerData?: Players, matches?: IRecordedMatchesData) {
        if (!playerData || !matches) return;
        this.playerData = playerData;
        Object.keys(matches).forEach(x => {
            this.addMatch(x, matches[x]);
        });
        this._list = this.sort(this.list);
    }

    get hash() {
        return this._hash;
    }
    get list() {
        return this._list;
    }

    addMatch(id: string, match: IRecordedMatch) {
        const recordedMatch = new RecordedMatch(id, match);
        this._hash[id] = recordedMatch;
        this._list.splice(0, 0, recordedMatch);
    }

    removeMatch(match: RecordedMatch) {
        delete this._hash[match.id];
        this._list.splice(this._list.indexOf(match), 1);
    }

    getSortedMatches() {
        return this._list;
    }

    getSortedMatchesByPlayer(id: string) {
        return this._list.filter(x => {
            const matchPlayer1Id = this.playerData.hash[x.player1].id;
            const matchPlayer2Id = this.playerData.hash[x.player2].id;
            return id === matchPlayer1Id || id === matchPlayer2Id;
        });
    }

    getSortedMatchesByPlayerAndOpponent(playerId: string, opponentId: string) {
        return this._list.filter(x => {
            const matchPlayer1Id = this.playerData.hash[x.player1].id;
            const matchPlayer2Id = this.playerData.hash[x.player2].id;
            return (playerId === matchPlayer1Id && opponentId === matchPlayer2Id) ||
                (playerId === matchPlayer2Id && opponentId === matchPlayer1Id);
        });
    }

    getOpponents(playerId: string) {
        const uniqueOpponents = new Set<string>();
        const opponents: Player[] = [];
        for (let i = 0; i < this.list.length; i++) {
            const opponent = this.list[i].getOpponent(playerId);
            if (opponent && !uniqueOpponents.has(opponent)) {
                uniqueOpponents.add(opponent);
                opponents.push(this.playerData.hash[opponent]);
            }
        }
        return opponents;
    }

    private sort(matches: RecordedMatch[]) {
        return matches.sort((a, b) => {
            if (a.timestamp === null || b.timestamp === null) return 0;
            return a.timestamp < b.timestamp ? 1 : -1;
        })
    }
}