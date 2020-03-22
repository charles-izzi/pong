import { IPlayers as IPlayerData } from '@/store/players';
import { Players } from './players';
import { Player } from './player';
import { PotentialMatches } from './potentialMatches';
import { Match } from './match';

interface IMemo {
    [key: string]: PotentialMatches | null;
}

export class MatchMaker {
    playerPool: Players = new Players();
    plannedPlayers: Players = new Players();
    private matches: Match[] = [];
    private memo: IMemo = {};
    constructor(public playerData: IPlayerData, private matchCount: number) { }

    setPlayers(newPlayers: string[], activeMatches: Match[]) {
        this.playerPool.setPlayers(newPlayers);
        this.resetPlannedData(activeMatches);
        this.makeMatches(this.plannedPlayers);
    }

    playMatch(match: Match) {
        this.remove(match);
        this.playerPool.updatePlayers([match]);
    }

    getMatches() {
        this.makeMatches(this.plannedPlayers);
        return this.sortedMatches;
    }

    private get sortedMatches() {
        return this.matches
            .sort((a: Match, b: Match) => {
                //sort by least played
                if (a.priority < b.priority) return -1;
                if (a.priority > b.priority) return 1;

                //then by rating (so that it's unlikely a player at the end of one round will start the next)
                if (a.getMatchRating() < b.getMatchRating()) return -1;
                if (a.getMatchRating() > b.getMatchRating()) return 1;

                return 0;
            })
            .slice(0, this.matchCount);
    }

    private makeMatches(players: Players) {        
        while (this.matches.length < this.matchCount) {
            const thisRoundPlayers = players.getCurrentRoundPlayers();
            if (thisRoundPlayers.length === 0) return;
            if (thisRoundPlayers.length === 1) {
                this.matchOddPlayer(players, thisRoundPlayers[0]);
                continue;
            }
            const roundOfMatches = this.getMinDiffDistinctMatches(new Players(thisRoundPlayers));
            this.memo = {};
            if (roundOfMatches === null) break;
            this.addMatches(roundOfMatches.matches);
            this.matchOddPlayer(players, roundOfMatches.oddPlayer);
        }
    }

    private getMinDiffDistinctMatches(thisRoundPlayers: Players): PotentialMatches | null {
        //break condition - we matched all the players except potentially 1 which we'll handle later
        if (thisRoundPlayers.players.length <= 1) {
            return new PotentialMatches(thisRoundPlayers.players.length === 1 ? thisRoundPlayers.players[0] : null);
        }

        //check memo
        const memoKey = thisRoundPlayers.getMemoKey(this.playerData);
        if (this.memo.hasOwnProperty(memoKey)) return this.memo[memoKey];

        let minDiffMatches: PotentialMatches | null = null;
        var candidate = thisRoundPlayers.players[0];

        //check min differential for every match with the candidate
        for (let i = 1; i < thisRoundPlayers.players.length; i++) {
            //distinct check
            if (!candidate.canPlayPlayer(thisRoundPlayers.players[i])) continue;

            const remainingPlayers = new Players(thisRoundPlayers.players);
            remainingPlayers.removeAt(i);
            remainingPlayers.removeAt(0);

            const remainingPotentialMatches = this.getMinDiffDistinctMatches(remainingPlayers);
            //if null is returned, there were remaining players who couldn't be matched because they've already played each other
            if (remainingPotentialMatches === null) continue;
            remainingPotentialMatches.add(new Match(this.playerData, thisRoundPlayers.players[0], thisRoundPlayers.players[i]));

            if (!minDiffMatches || minDiffMatches.totalRatingDifferential > remainingPotentialMatches.totalRatingDifferential) {
                minDiffMatches = remainingPotentialMatches.copy();
            }
        }
        this.memo[memoKey] = minDiffMatches;

        return minDiffMatches;
    }

    private matchOddPlayer(plannedPlayers: Players, oddPlayer: Player | null) {
        if (oddPlayer === null) return;
        let minDiffMatch: Match | null = null;
        for (var i = 0; i < plannedPlayers.players.length; i++) {
            const player = plannedPlayers.players[i];
            if (player.id === oddPlayer.id || !player.canPlayPlayer(oddPlayer))
                continue;

            const potentialMatch = new Match(this.playerData, oddPlayer, player);
            if (!minDiffMatch ||
                (minDiffMatch.ratingDifferential > potentialMatch.ratingDifferential &&
                    minDiffMatch.priority >= potentialMatch.priority)
            ) {
                minDiffMatch = potentialMatch;
            }
        }
        if (minDiffMatch !== null) this.addMatches([minDiffMatch]);
    }

    private addMatches(matches: Match[]) {
        this.matches = this.matches.concat(matches);
        this.plannedPlayers.updatePlayers(matches);
    }

    private resetPlannedData(exceptForTheseMatches: Match[]) {
        //reset plannedPlayers to active player pool
        this.plannedPlayers = new Players(this.playerPool.getActivePlayers());

        //ignore exceptForTheseMatches if the players in them have become inactive
        for (var i = 0; i < exceptForTheseMatches.length; i++) {
            if (
                !this.plannedPlayers.contains(exceptForTheseMatches[i].player1Id) ||
                !this.plannedPlayers.contains(exceptForTheseMatches[i].player2Id)
            ) {
                exceptForTheseMatches.splice(i, 1);
                i--;
            }
        }

        this.plannedPlayers.updatePlayers(exceptForTheseMatches);
        this.matches = [...exceptForTheseMatches];
    }

    private remove(match: Match) {
        this.matches.splice(this.matches.indexOf(match), 1);
    }
}
