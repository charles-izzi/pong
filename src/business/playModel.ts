export const selectedColor = "#add8e6";
export const winnerColor = "#90ee90";
export const unselectedColor = "white";

export interface IPlayer {
    player: string;
    elo: number;
    hidden: boolean;
}

export interface IPlayers {
    [key: string]: IPlayer;
}

export interface IPlay {
    player1: string;
    player2: string;
    player1Wins: boolean;
}

export interface IPlayerUpdate extends IPlayer {
    id: string
}

export interface IMatches {
    [key: string]: IMatch;
}

export interface IMatch {
    player1Name: string;
    player2Name: string;
    player1Wins: boolean;
    eloChange: number;
    timestamp: Date;
}

export interface IMatchesFilter {
    playerName: string;
    opponentName: string;
}

export interface IDropdown {
    text: string|number|object;
    value: string|number|object;
}