import RecordedMatches from "@/business/data/recordedMatches";
import { TestData } from '../../testData';
import RecordedMatch from '@/business/data/recordedMatch';

describe("Recorded Matches", () => {
    it("recordedMatches constructed with no arguments has empty hash and list", () => {
        const matches = new RecordedMatches();
        expect(matches.hash).toEqual({});
        expect(matches.list).toEqual([]);
    });
    it("recordedMatches constructed with IRecordedMatches fills out hash and list", () => {
        const match1 = { player1: "1", player2: "2", player1Elo: 1000, player2Elo: 1500, player1Wins: true, eloChange: 30, timestamp: new Date(1) };
        const match2 = { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(2) };
        const match3 = { player1: "1", player2: "4", player1Elo: 1300, player2Elo: 1200, player1Wins: true, eloChange: 10, timestamp: new Date(3) };
        const matches = new RecordedMatches(TestData.playerData, {
            "3": match3,
            "2": match2,
            "1": match1,
        });
        expect(matches.hash).toEqual({
            "1": new RecordedMatch("1", match1),
            "2": new RecordedMatch("2", match2),
            "3": new RecordedMatch("3", match3),
        });
        expect(matches.list).toEqual([
            new RecordedMatch("3", match3),
            new RecordedMatch("2", match2),
            new RecordedMatch("1", match1),
        ]);
    });
    it("addMatch adds the match to hash and list", () => {
        const match1 = { player1: "1", player2: "2", player1Elo: 1000, player2Elo: 1500, player1Wins: true, eloChange: 30, timestamp: new Date(1) };
        const match2 = { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(2) };
        const matches = new RecordedMatches(TestData.playerData, {
            "1": match1,
        });
        matches.addMatch("2", match2);
        expect(matches.hash).toEqual({
            "1": new RecordedMatch("1", match1),
            "2": new RecordedMatch("2", match2),
        });
        expect(matches.list).toEqual([
            new RecordedMatch("2", match2),
            new RecordedMatch("1", match1),
        ]);
    });
    it("removeMatch removes the match from hash and list", () => {
        const match1 = { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(2) };
        const match2 = { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(2) };
        const matches = new RecordedMatches(TestData.playerData, {
            "1": match1,
            "2": match2,
        });
        matches.removeMatch(matches.hash["1"]);
        expect(matches.hash).toEqual({
            "2": new RecordedMatch("2", match2),
        });
        expect(matches.list).toEqual([
            new RecordedMatch("2", match2),
        ]);
    });
    it("list returns matches sorted by date desc", () => {
        const match1 = { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(3) };
        const match2 = { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(1) };
        const match3 = { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(4) };
        const match4 = { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(2) };
        const matches = new RecordedMatches(TestData.playerData, {
            "1": match1,
            "2": match2,
            "3": match3,
            "4": match4
        });
        expect(matches.list).toEqual([
            new RecordedMatch("3", match3),
            new RecordedMatch("1", match1),
            new RecordedMatch("4", match4),
            new RecordedMatch("2", match2)
        ]);
    });
    it("getSortedMatchesByPlayer returns matches list containing the passed player sorted by date desc", () => {
        const match1 = { player1: "1", player2: "2", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(3) };
        const match2 = { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(1) };
        const match3 = { player1: "1", player2: "4", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(4) };
        const match4 = { player1: "2", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(2) };
        const matches = new RecordedMatches(TestData.playerData, {
            "1": match1,
            "2": match2,
            "3": match3,
            "4": match4
        });
        expect(matches.getSortedMatchesByPlayer("1")).toEqual([
            new RecordedMatch("3", match3),
            new RecordedMatch("1", match1),
            new RecordedMatch("2", match2)
        ]);
    });
    it("getSortedMatchesByPlayer returns matches list containing the passed player sorted by date desc", () => {
        const match1 = { player1: "1", player2: "2", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(3) };
        const match2 = { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(1) };
        const match3 = { player1: "2", player2: "1", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(4) };
        const match4 = { player1: "2", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(2) };
        const matches = new RecordedMatches(TestData.playerData, {
            "1": match1,
            "2": match2,
            "3": match3,
            "4": match4
        });
        expect(matches.getSortedMatchesByPlayerAndOpponent("1", "2")).toEqual([
            new RecordedMatch("3", match3),
            new RecordedMatch("1", match1),
        ]);
    });
    it("getOpponents returns distinct player list of passed player opponents", () => {
        const match1 = { player1: "1", player2: "2", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(3) };
        const match2 = { player1: "1", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(1) };
        const match3 = { player1: "2", player2: "1", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(4) };
        const match4 = { player1: "2", player2: "3", player1Elo: 1200, player2Elo: 1300, player1Wins: true, eloChange: 20, timestamp: new Date(2) };
        const matches = new RecordedMatches(TestData.playerData, {
            "1": match1,
            "2": match2,
            "3": match3,
            "4": match4
        });
        expect(matches.getOpponents("1")).toEqual([
            TestData.playerData.hash["2"],
            TestData.playerData.hash["3"],
        ]);
    });
});