import { Match as PlannedMatch } from '@/business/matchMaking/match';
import RecordedMatches from '@/business/data/recordedMatches';
import RecordedMatch from '@/business/data/recordedMatch';
import Players from '@/business/data/players';

export class TestData {
    static readonly playerData: Players = new Players({
        "1": {
            id: "1",
            player: "a",
            elo: 1350,
            rank: 1,
            hidden: false,
        },
        "2": {
            id: "2",
            player: "b",
            elo: 1300,
            rank: 1,
            hidden: false,
        },
        "3": {
            id: "3",
            player: "c",
            elo: 1250,
            rank: 1,
            hidden: false,
        },
        "4": {
            id: "4",
            player: "d",
            elo: 1200,
            rank: 1,
            hidden: false,
        },
        "5": {
            id: "5",
            player: "e",
            elo: 1150,
            rank: 1,
            hidden: false,
        },
        "6": {
            id: "6",
            player: "f",
            elo: 1100,
            rank: 1,
            hidden: false,
        },
        "7": {
            id: "7",
            player: "g",
            elo: 1050,
            rank: 1,
            hidden: false,
        },
        "8": {
            id: "8",
            player: "h",
            elo: 1000,
            rank: 1,
            hidden: false,
        },
        "9": {
            id: "9",
            player: "i",
            elo: 950,
            rank: 1,
            hidden: false,
        },
    });

    static get matches() {
        return new RecordedMatches(TestData.playerData, {
            "1": new RecordedMatch("1", { player1: "1", player2: "2", player1Elo: 1000, player2Elo: 1500, player1Wins: true, eloChange: 30, timestamp: new Date(1) }),
            "2": new RecordedMatch("2", { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(2) }),
            "3": new RecordedMatch("3", { player1: "1", player2: "4", player1Elo: 1300, player2Elo: 1200, player1Wins: true, eloChange: 10, timestamp: new Date(3) }),
            "4": new RecordedMatch("4", { player1: "1", player2: "5", player1Elo: 1350, player2Elo: 1150, player1Wins: false, eloChange: 7, timestamp: new Date(4) }),
            "5": new RecordedMatch("5", { player1: "1", player2: "6", player1Elo: 1400, player2Elo: 1500, player1Wins: false, eloChange: 10, timestamp: new Date(5) }),
            "6": new RecordedMatch("6", { player1: "1", player2: "7", player1Elo: 1350, player2Elo: 1300, player1Wins: false, eloChange: 17, timestamp: new Date(6) }),
            "7": new RecordedMatch("7", { player1: "1", player2: "2", player1Elo: 1300, player2Elo: 1250, player1Wins: false, eloChange: 17, timestamp: new Date(7) }),
            "9": new RecordedMatch("9", { player1: "2", player2: "3", player1Elo: 1300, player2Elo: 1500, player1Wins: false, eloChange: 7, timestamp: new Date(9) }),
            "8": new RecordedMatch("8", { player1: "2", player2: "4", player1Elo: 1250, player2Elo: 1200, player1Wins: true, eloChange: 10, timestamp: new Date(8) }),
            "10": new RecordedMatch("10", { player1: "2", player2: "5", player1Elo: 1250, player2Elo: 1100, player1Wins: false, eloChange: 25, timestamp: new Date(10) }),
            "11": new RecordedMatch("11", { player1: "2", player2: "3", player1Elo: 1250, player2Elo: 1100, player1Wins: true, eloChange: 25, timestamp: new Date(11) }),
            "12": new RecordedMatch("12", { player1: "1", player2: "5", player1Elo: 1250, player2Elo: 1100, player1Wins: true, eloChange: 25, timestamp: new Date(12) }),
            "13": new RecordedMatch("13", { player1: "3", player2: "1", player1Elo: 1250, player2Elo: 1100, player1Wins: true, eloChange: 25, timestamp: new Date(13) }),
            "14": new RecordedMatch("14", { player1: "4", player2: "5", player1Elo: 1250, player2Elo: 1100, player1Wins: false, eloChange: 25, timestamp: new Date(14) }),
            "15": new RecordedMatch("15", { player1: "4", player2: "6", player1Elo: 1250, player2Elo: 1100, player1Wins: true, eloChange: 25, timestamp: new Date(14) }),
            "16": new RecordedMatch("16", { player1: "6", player2: "5", player1Elo: 1250, player2Elo: 1100, player1Wins: false, eloChange: 25, timestamp: new Date(15) }),
        });
    }

    static plannedMatch(
        id1: string,
        id2: string,
        priority: number,
        ratingDifferential: number
    ) {
        const match = new PlannedMatch(TestData.playerData);
        match.player1Id = id1;
        match.player2Id = id2;
        match.priority = priority;
        match.ratingDifferential = ratingDifferential;
        return match;
    }
} 