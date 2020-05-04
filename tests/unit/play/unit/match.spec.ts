import Match from "@/business/play/match";
import { TestData } from '../../testData';
import Player from '@/business/data/player';

describe("Play Match", () => {
    it("Match constructed with no winnerId has new players and no winner id", () => {
        const match = new Match(TestData.playerData.hash["1"], TestData.playerData.hash["2"]);
        expect(match.player1).toEqual(TestData.playerData.hash["1"]);
        expect(match.player2).toEqual(TestData.playerData.hash["2"]);
        expect(match.player1).not.toBe(TestData.playerData.hash["1"]);
        expect(match.player2).not.toBe(TestData.playerData.hash["2"]);
        expect(match.winnerId).toBe(undefined);
    });
    it("Match constructed with winnerId has player properties and winner id", () => {
        const match = new Match(TestData.playerData.hash["1"], TestData.playerData.hash["2"], "1");
        expect(match.player1).toEqual(TestData.playerData.hash["1"]);
        expect(match.player2).toEqual(TestData.playerData.hash["2"]);
        expect(match.winnerId).toBe("1");
    });
    it("player1Wins returns true for winnerId as player1", () => {
        const match = new Match(TestData.playerData.hash["2"], TestData.playerData.hash["3"], "2");
        expect(match.player1Wins).toBe(true);
    });
    it("player1Wins returns false for winnerId as player2", () => {
        const match = new Match(TestData.playerData.hash["2"], TestData.playerData.hash["3"], "3");
        expect(match.player1Wins).toBe(false);
    });
    it("isPlayerWinner returns true for passed winnerId false otherwise", () => {
        const match = new Match(TestData.playerData.hash["2"], TestData.playerData.hash["3"], "3");
        expect(match.isPlayerWinner("2")).toBe(false);
        expect(match.isPlayerWinner("3")).toBe(true);
    });
    it("play changes player elo properly", () => {
        let player1 = TestData.playerData.hash["2"];
        let player2 = TestData.playerData.hash["3"];
        const match = new Match(player1, player2, "3");
        match.play(TestData.playerData);

        player1 = new Player({ ...player1 });
        player1.elo = 1283;
        expect(match.player1).toEqual(player1);

        player2 = new Player({ ...player2 });
        player2.elo = 1267;
        expect(match.player2).toEqual(player2);
    });
    it("play uses latest player data", () => {
        let player1 = TestData.playerData.hash["2"];
        let player2 = TestData.playerData.hash["3"];
        const match = new Match(player1, player2, "3");
        const latestTestData = TestData.playerDataCopy;
        latestTestData.hash["2"].elo = 1200;
        latestTestData.hash["3"].elo = 1200;

        match.play(latestTestData);

        player1 = new Player({ ...player1 });
        player1.elo = 1185;
        expect(match.player1).toEqual(player1);

        player2 = new Player({ ...player2 });
        player2.elo = 1215;
        expect(match.player2).toEqual(player2);
    });
    it("getMatchLog matches IMatchLog with proper timestamp", () => {
        const match = new Match(TestData.playerData.hash["2"], TestData.playerData.hash["3"], "3");
        const beforeDate = new Date();
        match.play(TestData.playerData);
        const matchlog = match.getMatchLog();
        expect(matchlog.eloChange).toBe(17);
        expect(matchlog.player1).toBe("2");
        expect(matchlog.player1Elo).toBe(1300);
        expect(matchlog.player2).toBe("3");
        expect(matchlog.player2Elo).toBe(1250);
        expect(matchlog.player1Wins).toBe(false);
        expect(matchlog.timestamp.valueOf()).toBeGreaterThanOrEqual(beforeDate.valueOf());
        expect(matchlog.timestamp.valueOf()).toBeLessThanOrEqual(new Date().valueOf());
    });
});