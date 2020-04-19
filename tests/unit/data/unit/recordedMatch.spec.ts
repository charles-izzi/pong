import RecordedMatch from "@/business/data/recordedMatch";
import { TestData } from '../../testData';

describe("Recorded Match", () => {
    it("RecordedMatch constructor adds all properties", () => {
        const recordedMatch = new RecordedMatch("1", {
            player1: "1",
            player2: "2",
            player1Elo: 1000,
            player2Elo: 1500,
            player1Wins: true,
            eloChange: 30,
            timestamp: new Date(1)
        });
        expect(recordedMatch).toEqual({
            id: "1",
            player1: "1",
            player2: "2",
            player1Elo: 1000,
            player2Elo: 1500,
            player1Wins: true,
            eloChange: 30,
            timestamp: new Date(1)
        });
    });
    it("updateMatch returns new player objects with elo change and sets eloChange to zero", () => {
        const recordedMatch = new RecordedMatch("1", {
            player1: "1",
            player2: "2",
            player1Elo: 1000,
            player2Elo: 1500,
            player1Wins: true,
            eloChange: 30,
            timestamp: new Date(1)
        });
        const playerData = TestData.playerDataCopy;
        const undonePlayers = recordedMatch.undoMatch(playerData);
        const player1 = playerData.hash["1"];
        player1.elo = 1320;
        const player2 = playerData.hash["2"];
        player2.elo = 1330;
        expect(undonePlayers).toEqual({
            player1,
            player2
        });
        expect(undonePlayers.player1).not.toBe(player1);
        expect(undonePlayers.player2).not.toBe(player2);
        expect(recordedMatch.eloChange).toBe(0);
    });
    it("player1 isWinner returns true for match player1 wins and opposite for player 2", () => {
        const recordedMatch = new RecordedMatch("1", {
            player1: "1",
            player2: "2",
            player1Elo: 1000,
            player2Elo: 1500,
            player1Wins: true,
            eloChange: 30,
            timestamp: new Date(1)
        });
        expect(recordedMatch.isWinner("1")).toBe(true);
        expect(recordedMatch.isWinner("2")).toBe(false);
    });
    it("player1 isWinner returns false for match player1 loses and opposite for player 2", () => {
        const recordedMatch = new RecordedMatch("1", {
            player1: "1",
            player2: "2",
            player1Elo: 1000,
            player2Elo: 1500,
            player1Wins: false,
            eloChange: 30,
            timestamp: new Date(1)
        });
        expect(recordedMatch.isWinner("1")).toBe(false);
        expect(recordedMatch.isWinner("2")).toBe(true);
    });
    it("hasPlayer returns true for players in the match and false otherwise", () => {
        const recordedMatch = new RecordedMatch("1", {
            player1: "1",
            player2: "2",
            player1Elo: 1000,
            player2Elo: 1500,
            player1Wins: false,
            eloChange: 30,
            timestamp: new Date(1)
        });
        expect(recordedMatch.hasPlayer("1")).toBe(true);
        expect(recordedMatch.hasPlayer("2")).toBe(true);
        expect(recordedMatch.hasPlayer("3")).toBe(false);
        expect(recordedMatch.hasPlayer("4")).toBe(false);
    });
    it("getOpponent returns the opponent of passed in player unless passed player isn't in the match", () => {
        const recordedMatch = new RecordedMatch("1", {
            player1: "1",
            player2: "2",
            player1Elo: 1000,
            player2Elo: 1500,
            player1Wins: false,
            eloChange: 30,
            timestamp: new Date(1)
        });
        expect(recordedMatch.getOpponent("1")).toBe("2");
        expect(recordedMatch.getOpponent("2")).toBe("1");
        expect(recordedMatch.getOpponent("3")).toBe(null);
        expect(recordedMatch.getOpponent("4")).toBe(null);
    });
});