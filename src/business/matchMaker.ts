import { IPlayers as IPlayerData } from "@/business/playModel";
interface IPlayer {
    gamesPlayed: number;
    playersPlayed: Set<string>;
    isActive: boolean;
}

interface IPlayers {
    [key: string]: IPlayer;
}

interface IMemo {
    [key: string]: IPotentialMatches | null;
}

export interface IMatch {
    player1Id: string;
    player2Id: string;
    priority: number;
}

interface IPotentialMatch {
    ratingDifference: number;
    match: IMatch;
}

interface IPotentialMatches {
    totalRatingDifferential: number;
    matches: IMatch[];
    oddPlayer: string | null;
}

export class MatchMaker {
    players: IPlayerData;
    playerPool: IPlayers = {};
    plannedPlayers: IPlayers = {};
    matches: IMatch[] = [];
    round: number = 0;
    plannedRound: number = 0;
    matchCount: number = 10;
    memo: IMemo = {};
    constructor(players: IPlayerData, matchCount: number) {
        this.players = players;
        this.matchCount = matchCount || this.matchCount;
    }

    setPlayers(newPlayers: Set<string>, activeMatches: IMatch[]) {
        //remove players
        Object.keys(this.playerPool).forEach((val: string) => {
            if (!newPlayers.has(val)) this.playerPool[val].isActive = false;
        })

        //add players
        newPlayers.forEach((val: string) => {
            this.addPlayer(val);
        });

        this.recalculateMatches(activeMatches);
    }

    getMatches() {
        this.makeMatches();
        return this.matches.sort((a: IMatch, b: IMatch) => {
            //sort by least played
            if (a.priority < b.priority) return -1;
            if (a.priority > b.priority) return 1;

            //then by rating (so that it's unlikely a player at the end of one round will start the next)
            const sumA = this.getMatchRatingSum(a);
            const sumB = this.getMatchRatingSum(b);
            if (sumA < sumB) return -1;
            if (sumA > sumB) return 1;

            return 0;
        }).slice(0, this.matchCount);
    }

    playMatch(match: IMatch) {
        this.matches.splice(this.matches.indexOf(match), 1);
        this.updatePlayers(match);
        this.round = this.getMinRound(this.playerPool);
    }

    private makeMatches() {
        while (this.matches.length < this.matchCount) {
            const thisRoundPlayers = Object.keys(this.plannedPlayers)
                .filter((x: string) => this.plannedPlayers[x].gamesPlayed === this.plannedRound);
            if (thisRoundPlayers.length === 0) return;
            const roundOfMatches = this.getMinDiffDistinctMatches(thisRoundPlayers) as IPotentialMatches;
            this.memo = {};
            this.updatePlannedPlayers(roundOfMatches.matches);
            this.plannedRound++;
            this.matches = this.matches.concat(roundOfMatches.matches);
            this.matchOddPlayer(roundOfMatches.oddPlayer);
        }
    }

    private getMinDiffDistinctMatches(rankedLeastPlayedPlayerIds: string[]): IPotentialMatches | null {
        //break condition - we matched all the players except potentially 1 which we'll handle later
        if (rankedLeastPlayedPlayerIds.length <= 1) {
            return {
                totalRatingDifferential: 0,
                matches: [],
                oddPlayer: rankedLeastPlayedPlayerIds.length === 1 ? rankedLeastPlayedPlayerIds[0] : null
            } as IPotentialMatches;
        }

        //check memo
        const memoKey = this.getPlayersMemoKey(rankedLeastPlayedPlayerIds);
        if (this.memo.hasOwnProperty(memoKey)) return this.memo[memoKey];

        let minDiffMatches: IPotentialMatches | null = null;
        var candidate = this.plannedPlayers[rankedLeastPlayedPlayerIds[0]];

        //check min differential for every match with the candidate
        for (let i = 1; i < rankedLeastPlayedPlayerIds.length; i++) {

            if (candidate.playersPlayed.has(rankedLeastPlayedPlayerIds[i])) continue;

            let ratingDiff = Math.abs(this.players[rankedLeastPlayedPlayerIds[0]].elo - this.players[rankedLeastPlayedPlayerIds[i]].elo);
            let potentialMatch = {
                player1Id: rankedLeastPlayedPlayerIds[0],
                player2Id: rankedLeastPlayedPlayerIds[i],
                priority: this.plannedPlayers[rankedLeastPlayedPlayerIds[0]].gamesPlayed + this.plannedPlayers[rankedLeastPlayedPlayerIds[i]].gamesPlayed
            } as IMatch;

            const remainingPlayers = this.getRemainingPlayersCopy(rankedLeastPlayedPlayerIds, i);
            const remainingPotentialMatches = this.getMinDiffDistinctMatches(remainingPlayers);
            //if null is returned, there were remaining players who couldn't be matched because they've already played each other
            if (remainingPotentialMatches === null) continue;

            remainingPotentialMatches.totalRatingDifferential += ratingDiff;
            if (!minDiffMatches || minDiffMatches.totalRatingDifferential > remainingPotentialMatches.totalRatingDifferential) {
                minDiffMatches = this.copyPotentialMatches(remainingPotentialMatches);
                minDiffMatches.matches.push({ ...potentialMatch });
            }
        }
        this.memo[memoKey] = minDiffMatches;

        return minDiffMatches;
    }

    private getRemainingPlayersCopy(playerIds: string[], i: number) {
        const remainingPlayers: string[] = [];
        for (var j = 1; j < playerIds.length; j++) {
            if (j === i) continue;
            remainingPlayers.push(playerIds[j]);
        }
        return remainingPlayers;
    }

    private updatePlayers(match: IMatch) {
        this.playerPool[match.player1Id].gamesPlayed++;
        this.playerPool[match.player2Id].gamesPlayed++;

        this.playerPool[match.player1Id].playersPlayed.add(match.player2Id);
        this.playerPool[match.player2Id].playersPlayed.add(match.player1Id);

        if (this.playerPool[match.player1Id].playersPlayed.size >= this.activePlayerCount - 1) {
            this.playerPool[match.player1Id].playersPlayed.clear();
        }
        if (this.playerPool[match.player2Id].playersPlayed.size >= this.activePlayerCount - 1) {
            this.playerPool[match.player2Id].playersPlayed.clear();
        }
    }

    private updatePlannedPlayers(plannedMatches: IMatch[]) {
        for (var i = 0; i < plannedMatches.length; i++) {
            this.plannedPlayers[plannedMatches[i].player1Id].gamesPlayed++;
            this.plannedPlayers[plannedMatches[i].player2Id].gamesPlayed++;

            this.plannedPlayers[plannedMatches[i].player1Id].playersPlayed.add(plannedMatches[i].player2Id);
            this.plannedPlayers[plannedMatches[i].player2Id].playersPlayed.add(plannedMatches[i].player1Id);

            if (this.plannedPlayers[plannedMatches[i].player1Id].playersPlayed.size === Object.keys(this.plannedPlayers).length - 1) {
                this.plannedPlayers[plannedMatches[i].player1Id].playersPlayed.clear();
            }
            if (this.plannedPlayers[plannedMatches[i].player2Id].playersPlayed.size === Object.keys(this.plannedPlayers).length - 1) {
                this.plannedPlayers[plannedMatches[i].player2Id].playersPlayed.clear();
            }
        }
    }

    private matchOddPlayer(oddPlayer: string | null) {
        if (oddPlayer === null) return;
        const playerIds = Object.keys(this.plannedPlayers);
        let minDiffMatch: IPotentialMatch | null = null;
        for (var i = 0; i < playerIds.length; i++) {
            const matchCandidate = this.plannedPlayers[playerIds[i]];
            if (playerIds[i] === oddPlayer || matchCandidate.gamesPlayed > this.plannedRound || matchCandidate.playersPlayed.has(oddPlayer)) continue;
            const ratingDifference = Math.abs(this.players[playerIds[i]].elo - this.players[oddPlayer].elo);
            if (minDiffMatch === null || minDiffMatch.ratingDifference > ratingDifference) {
                minDiffMatch = {
                    ratingDifference,
                    match: {
                        player1Id: oddPlayer,
                        player2Id: playerIds[i],
                        priority: this.plannedPlayers[oddPlayer].gamesPlayed + this.plannedPlayers[playerIds[i]].gamesPlayed
                    }
                };
            }
        }
        if (minDiffMatch === null) return;
        this.updatePlannedPlayers([minDiffMatch.match]);
        this.matches.push(minDiffMatch.match);
    }

    private addPlayer(val: string) {
        if (!this.playerPool.hasOwnProperty(val)) {
            this.playerPool[val] = { gamesPlayed: this.round, playersPlayed: new Set<string>(), isActive: true };
            return;
        }
        if (this.playerPool.hasOwnProperty(val) && !this.playerPool[val].isActive) {
            this.playerPool[val].isActive = true;
            this.playerPool[val].gamesPlayed = Math.max(this.playerPool[val].gamesPlayed, this.round);
        }
    }

    private recalculateMatches(activeMatches: IMatch[]) {
        this.resetPlannedData(activeMatches);
        this.makeMatches();
    }

    private resetPlannedData(exceptForTheseMatches: IMatch[]) {

        //reset plannedPlayers to active player pool
        this.plannedPlayers = {};
        Object.keys(this.playerPool).forEach(x => {
            if (this.playerPool[x].isActive) {
                this.plannedPlayers[x] = this.deepCopyPlayer(this.playerPool[x]);
            }
        });

        //track planned players games played from the matches that weren't reset
        for (var i = 0; i < exceptForTheseMatches.length; i++) {
            if (!this.plannedPlayers.hasOwnProperty(exceptForTheseMatches[i].player1Id) || !this.plannedPlayers.hasOwnProperty(exceptForTheseMatches[i].player2Id)) {
                exceptForTheseMatches.splice(i, 1);
                i--;
            } else {
                this.plannedPlayers[exceptForTheseMatches[i].player1Id].gamesPlayed++;
                this.plannedPlayers[exceptForTheseMatches[i].player2Id].gamesPlayed++;
            }
        }
        this.matches = [...exceptForTheseMatches];

        //reset round and increase the planned round if the number of players in 
        // the active matches is greater than the number of planned players
        this.plannedRound = this.round;
        this.plannedRound = this.getMinRound(this.plannedPlayers);
    }

    private getMatchRatingSum(match: IMatch) {
        return this.players[match.player1Id].elo + this.players[match.player2Id].elo;
    }

    private deepCopyPlayer(player: IPlayer) {
        const activePlayersPlayed = this.getActivePlayersPlayed(player);
        return {
            gamesPlayed: player.gamesPlayed,
            isActive: player.isActive,
            playersPlayed: activePlayersPlayed.size >= this.activePlayerCount - 1 ? new Set<string>() : activePlayersPlayed
        }
    }

    private getMinRound(players: IPlayers) {
        let min = null;
        const playerIds = Object.keys(players);
        for (let i = 0; i < playerIds.length; i++) {
            const player = players[playerIds[i]];
            if (player.isActive && (min === null || min > player.gamesPlayed))
                min = player.gamesPlayed
        }
        return min || 0;
    }

    private getPlayersMemoKey(players: string[]) {
        let key = "";
        for (var i = 0; i < players.length; i++) {
            key += this.players[players[i]].player;
        }
        return key;
    }

    private copyPotentialMatches(matches: IPotentialMatches): IPotentialMatches {
        return JSON.parse(JSON.stringify(matches));
    }

    private getActivePlayersPlayed(player: IPlayer) {
        const playersPlayed = new Set<string>();
        player.playersPlayed.forEach((x: string) => {
            if (this.playerPool[x].isActive && player.playersPlayed.has(x))
                playersPlayed.add(x);
        })
        return playersPlayed;
    }

    get activePlayerCount() {
        return Object.keys(this.playerPool).filter(x => this.playerPool[x].isActive).length;
    }
}