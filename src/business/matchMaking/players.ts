import PlayerData from '@/business/data/players';
import { Player } from './player';
import { IMatch } from './match';

export class Players {
    players: Player[] = [];
    private playerDictionary: { [id: string]: Player } = {};
    private currentRound = 0;
    constructor();
    constructor(players: Player[]);
    constructor(players?: Player[]) {
        if (!players) return;
        for (let i = 0; i < players.length; i++) {
            this.add(new Player(players[i].id, players[i].gamesPlayed, players[i].playersPlayed, players[i].isActive));
        }
        this.currentRound = this.getCurrentRound();
    }

    getActivePlayers() {
        return this.players.filter((x: Player) => x.isActive);
    }

    getCurrentRoundPlayers() {
        this.currentRound = this.getCurrentRound();
        return this.players.filter(
            (x: Player) => x.gamesPlayed === this.currentRound
        );
    }

    updatePlayers(matches: IMatch[]) {
        for (let i = 0; i < matches.length; i++) {
            const player1 = this.playerDictionary[matches[i].player1Id];
            const player2 = this.playerDictionary[matches[i].player2Id];
            player1.gamesPlayed++;
            player2.gamesPlayed++;

            player1.playersPlayed.add(matches[i].player2Id);
            player2.playersPlayed.add(matches[i].player1Id);

            if (player1.playersPlayed.size === this.players.length - 1) {
                player1.playersPlayed.clear();
            }
            if (player2.playersPlayed.size === this.players.length - 1) {
                player2.playersPlayed.clear();
            }
        }
        this.currentRound = this.getCurrentRound();
    }

    setPlayers(newPlayers: string[]) {

        //set all isActive to false
        this.players.forEach((x: Player) => {
            x.isActive = false
        });

        //activate existing players and add new players
        newPlayers.forEach((id: string) => {
            if (Object.prototype.hasOwnProperty.call(this.playerDictionary, id)) {
                this.activate(this.playerDictionary[id]);
            } else {
                this.add(new Player(id));
            }
        });
    }

    getMemoKey(playerData: PlayerData) {
        const keyArr = [];
        for (let i = 0; i < this.players.length; i++) {
            keyArr.push(playerData.hash[this.players[i].id].player);
        }
        return keyArr.join("");
    }

    removeAt(i: number) {
        delete this.playerDictionary[this.players[i].id];
        this.players.splice(i, 1);
    }

    contains(id: string) {
        return Object.prototype.hasOwnProperty.call(this.playerDictionary, id);
    }

    private activate(player: Player) {
        player.isActive = true;
        player.gamesPlayed = Math.max(player.gamesPlayed, this.currentRound);
    }

    private add(player: Player) {
        player.gamesPlayed = Math.max(player.gamesPlayed, this.currentRound);
        this.players.push(player);
        this.playerDictionary[player.id] = player;
    }

    private getCurrentRound() {
        let min: number | null = null;
        this.players.forEach((x: Player) => {
            if (x.isActive && (min === null || min > x.gamesPlayed))
                min = x.gamesPlayed;
        });
        return min || 0;
    }
}