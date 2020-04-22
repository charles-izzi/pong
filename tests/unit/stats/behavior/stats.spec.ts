import { TestData } from '../../testData';
import Stats from '@/business/stats/stats';

describe("Stats", () => {

    //win rate
    it("all players have no win rate stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches);
        expect(stats.winRate.hasStat).toBe(false);
    });
    it("player 1 has win rate stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.winRate.hasStat).toBe(true);
    });
    it("player 3 has win rate stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "3");
        expect(stats.winRate.hasStat).toBe(true);
    });
    it("player 1 vs player 2 has win rate stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1", "2");
        expect(stats.winRate.hasStat).toBe(true);
    });

    //fare against
    it("all players have no fare against stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches);
        expect(stats.fareAgainst.strong.hasStat).toBe(false);
        expect(stats.fareAgainst.weak.hasStat).toBe(false);
    });
    it("player 1 has no strong stat and has weak stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.fareAgainst.strong.hasStat).toBe(false);
        expect(stats.fareAgainst.weak.hasStat).toBe(true);
    });
    it("player 3 has has strong stat and no weak stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "3");
        expect(stats.fareAgainst.strong.hasStat).toBe(true);
        expect(stats.fareAgainst.weak.hasStat).toBe(false);
    });
    it("player 1 vs player 2 has has no strong stat and has weak stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1", "2");
        expect(stats.fareAgainst.strong.hasStat).toBe(false);
        expect(stats.fareAgainst.weak.hasStat).toBe(true);
    });

    //streak
    it("all players have no streak stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches);
        expect(stats.streak.win.hasStat).toBe(false);
        expect(stats.streak.lose.hasStat).toBe(false);
    });
    it("player 1 has win streak stat and has lose streak stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.streak.win.hasStat).toBe(true);
        expect(stats.streak.lose.hasStat).toBe(true);
    });
    it("player 7 has win streak stat and has no lose streak stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "7");
        expect(stats.streak.win.hasStat).toBe(true);
        expect(stats.streak.lose.hasStat).toBe(false);
    });
    it("player 1 vs player 7 has no win streak stat and has lose streak stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1", "7");
        expect(stats.streak.win.hasStat).toBe(false);
        expect(stats.streak.lose.hasStat).toBe(true);
    });

    //max rating
    it("all players have no streak stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches);
        expect(stats.maxRating.win.hasStat).toBe(false);
        expect(stats.maxRating.loss.hasStat).toBe(false);
    });
    it("player 1 has best win and has worst loss stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.maxRating.win.hasStat).toBe(true);
        expect(stats.maxRating.loss.hasStat).toBe(true);
    });
    it("player 7 has best win and no worst loss stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "7");
        expect(stats.maxRating.win.hasStat).toBe(true);
        expect(stats.maxRating.loss.hasStat).toBe(false);
    });
    it("player 1 vs player 7 has no best win or worst loss stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1", "7");
        expect(stats.maxRating.win.hasStat).toBe(false);
        expect(stats.maxRating.loss.hasStat).toBe(false);
    });
});
