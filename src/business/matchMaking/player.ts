export class Player {
    id: string;
    gamesPlayed: number;
    playersPlayed: Set<string>;
    isActive: boolean;
    constructor(id: string);
    constructor(id: string, gamesPlayed: number, playersPlayed: Set<string>, isActive: boolean);
    constructor(id: string, gamesPlayed?: number, playersPlayed?: Set<string>, isActive?: boolean) {
        this.id = id;
        this.gamesPlayed = gamesPlayed || 0;
        this.playersPlayed = new Set<string>(playersPlayed) || new Set<string>();
        this.isActive = isActive === false ? false : true;
    }

    canPlayPlayer(player: Player) {
        return this.isActive &&
            player.isActive &&
            !this.playersPlayed.has(player.id) &&
            !player.playersPlayed.has(this.id)
    }
}