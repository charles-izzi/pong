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

    static get playerDataCopy() {
        return new Players({ ...TestData.playerData.hash });
    }

    static get matches() {
        return new RecordedMatches(TestData.playerData, {
            "1": new RecordedMatch("1", { player1: "1", player2: "2", player1Elo: 1000, player2Elo: 1500, player1Wins: true, eloChange: 30, timestamp: new Date("1/1/2019") }),
            "2": new RecordedMatch("2", { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date("1/2/2019") }),
            "3": new RecordedMatch("3", { player1: "1", player2: "4", player1Elo: 1300, player2Elo: 1200, player1Wins: true, eloChange: 10, timestamp: new Date("1/21/2019") }),
            "4": new RecordedMatch("4", { player1: "1", player2: "5", player1Elo: 1350, player2Elo: 1150, player1Wins: false, eloChange: 7, timestamp: new Date("2/1/2019") }),
            "5": new RecordedMatch("5", { player1: "1", player2: "6", player1Elo: 1400, player2Elo: 1500, player1Wins: false, eloChange: 10, timestamp: new Date("2/2/2019") }),
            "6": new RecordedMatch("6", { player1: "1", player2: "7", player1Elo: 1350, player2Elo: 1050, player1Wins: false, eloChange: 17, timestamp: new Date("2/21/2019") }),
            "7": new RecordedMatch("7", { player1: "1", player2: "2", player1Elo: 1300, player2Elo: 1250, player1Wins: false, eloChange: 17, timestamp: new Date("10/1/2019") }),
            "8": new RecordedMatch("8", { player1: "2", player2: "4", player1Elo: 1250, player2Elo: 1200, player1Wins: true, eloChange: 10, timestamp: new Date("10/10/2019") }),
            "9": new RecordedMatch("9", { player1: "2", player2: "3", player1Elo: 1300, player2Elo: 1500, player1Wins: false, eloChange: 7, timestamp: new Date("1/1/2020") }),
            "10": new RecordedMatch("10", { player1: "2", player2: "5", player1Elo: 1250, player2Elo: 1100, player1Wins: false, eloChange: 25, timestamp: new Date("1/2/2020") }),
            "11": new RecordedMatch("11", { player1: "2", player2: "3", player1Elo: 1250, player2Elo: 1650, player1Wins: true, eloChange: 25, timestamp: new Date("1/10/2020") }),
            "12": new RecordedMatch("12", { player1: "1", player2: "5", player1Elo: 1250, player2Elo: 1100, player1Wins: true, eloChange: 25, timestamp: new Date("2/1/2020") }),
            "13": new RecordedMatch("13", { player1: "3", player2: "1", player1Elo: 1250, player2Elo: 1100, player1Wins: true, eloChange: 25, timestamp: new Date("2/2/2020") }),
            "14": new RecordedMatch("14", { player1: "4", player2: "5", player1Elo: 1250, player2Elo: 1100, player1Wins: false, eloChange: 25, timestamp: new Date("2/21/2020") }),
            "15": new RecordedMatch("15", { player1: "4", player2: "6", player1Elo: 1250, player2Elo: 1100, player1Wins: true, eloChange: 25, timestamp: new Date("10/1/2020") }),
            "16": new RecordedMatch("16", { player1: "6", player2: "5", player1Elo: 1250, player2Elo: 1100, player1Wins: false, eloChange: 25, timestamp: new Date("10/10/2020") }),
            "17": new RecordedMatch("17", { player1: "8", player2: "9", player1Elo: 1200, player2Elo: 1200, player1Wins: false, eloChange: 15, timestamp: new Date("10/11/2019") }),
            "18": new RecordedMatch("18", { player1: "8", player2: "9", player1Elo: 1185, player2Elo: 1215, player1Wins: false, eloChange: 15, timestamp: new Date("10/12/2019") }),
            "19": new RecordedMatch("19", { player1: "8", player2: "9", player1Elo: 1170, player2Elo: 1230, player1Wins: false, eloChange: 15, timestamp: new Date("10/13/2019") }),
            "20": new RecordedMatch("20", { player1: "8", player2: "9", player1Elo: 1155, player2Elo: 1245, player1Wins: false, eloChange: 15, timestamp: new Date("10/14/2019") }),
            "21": new RecordedMatch("21", { player1: "8", player2: "9", player1Elo: 1140, player2Elo: 1260, player1Wins: false, eloChange: 15, timestamp: new Date("10/15/2019") }),
            "22": new RecordedMatch("22", { player1: "8", player2: "9", player1Elo: 1125, player2Elo: 1275, player1Wins: false, eloChange: 15, timestamp: new Date("10/16/2019") }),
            "23": new RecordedMatch("23", { player1: "8", player2: "9", player1Elo: 1110, player2Elo: 1290, player1Wins: true, eloChange: 15, timestamp: new Date("10/17/2019") }),
            "24": new RecordedMatch("24", { player1: "8", player2: "9", player1Elo: 1125, player2Elo: 1275, player1Wins: true, eloChange: 15, timestamp: new Date("10/18/2019") }),
            "25": new RecordedMatch("25", { player1: "8", player2: "9", player1Elo: 1140, player2Elo: 1260, player1Wins: true, eloChange: 15, timestamp: new Date("10/19/2019") }),
            "26": new RecordedMatch("26", { player1: "8", player2: "9", player1Elo: 1155, player2Elo: 1245, player1Wins: true, eloChange: 15, timestamp: new Date("10/20/2019") }),
            "27": new RecordedMatch("27", { player1: "8", player2: "9", player1Elo: 1170, player2Elo: 1230, player1Wins: true, eloChange: 15, timestamp: new Date("10/21/2019") }),
            "28": new RecordedMatch("28", { player1: "8", player2: "9", player1Elo: 1185, player2Elo: 1215, player1Wins: false, eloChange: 15, timestamp: new Date("10/22/2019") }),
            "29": new RecordedMatch("29", { player1: "8", player2: "9", player1Elo: 1170, player2Elo: 1230, player1Wins: false, eloChange: 15, timestamp: new Date("10/23/2019") }),
            "30": new RecordedMatch("30", { player1: "8", player2: "9", player1Elo: 1155, player2Elo: 1245, player1Wins: false, eloChange: 15, timestamp: new Date("10/24/2019") }),
            "31": new RecordedMatch("31", { player1: "8", player2: "9", player1Elo: 1140, player2Elo: 1260, player1Wins: false, eloChange: 15, timestamp: new Date("10/25/2019") }),
            "32": new RecordedMatch("32", { player1: "8", player2: "9", player1Elo: 1125, player2Elo: 1275, player1Wins: false, eloChange: 15, timestamp: new Date("10/26/2019") }),
            "33": new RecordedMatch("33", { player1: "8", player2: "9", player1Elo: 1110, player2Elo: 1290, player1Wins: false, eloChange: 15, timestamp: new Date("10/27/2019") }),
            "34": new RecordedMatch("34", { player1: "8", player2: "9", player1Elo: 1095, player2Elo: 1305, player1Wins: false, eloChange: 15, timestamp: new Date("10/28/2019") }),
            "35": new RecordedMatch("35", { player1: "8", player2: "9", player1Elo: 1080, player2Elo: 1320, player1Wins: false, eloChange: 15, timestamp: new Date("10/29/2019") }),
            "36": new RecordedMatch("36", { player1: "8", player2: "9", player1Elo: 1065, player2Elo: 1335, player1Wins: false, eloChange: 15, timestamp: new Date("10/30/2019") }),
            "37": new RecordedMatch("37", { player1: "8", player2: "9", player1Elo: 1050, player2Elo: 1350, player1Wins: true, eloChange: 15, timestamp: new Date("11/01/2019") }),
            "38": new RecordedMatch("38", { player1: "8", player2: "9", player1Elo: 1065, player2Elo: 1335, player1Wins: true, eloChange: 15, timestamp: new Date("11/02/2019") }),
            "39": new RecordedMatch("39", { player1: "8", player2: "9", player1Elo: 1080, player2Elo: 1320, player1Wins: true, eloChange: 15, timestamp: new Date("11/03/2019") }),
            "40": new RecordedMatch("40", { player1: "8", player2: "9", player1Elo: 1095, player2Elo: 1305, player1Wins: false, eloChange: 15, timestamp: new Date("11/04/2019") }),
            "41": new RecordedMatch("41", { player1: "8", player2: "9", player1Elo: 1080, player2Elo: 1320, player1Wins: false, eloChange: 15, timestamp: new Date("11/05/2019") }),
            "42": new RecordedMatch("42", { player1: "8", player2: "9", player1Elo: 1065, player2Elo: 1335, player1Wins: false, eloChange: 15, timestamp: new Date("11/06/2019") }),
            "43": new RecordedMatch("43", { player1: "8", player2: "9", player1Elo: 1050, player2Elo: 1350, player1Wins: false, eloChange: 15, timestamp: new Date("11/07/2019") }),
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