import Stats from "@/business/stats/stats";
import { TestData } from '../../testData';

describe("Max Rating", () => {
    it("player 1's best win is 1500 against player 2", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.maxRating.win.elo).toBe(1500);
        expect(stats.maxRating.win.opponentId).toBe("2");
        expect(stats.maxRating.win.timestamp).toEqual(new Date("1/1/2019"));
    });
    it("player 1's worst loss is 1050 against player 7", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.maxRating.loss.elo).toBe(1050);
        expect(stats.maxRating.loss.opponentId).toBe("7");
        expect(stats.maxRating.loss.timestamp).toEqual(new Date("2/21/2019"));
    });
    it("player 2's best win is 1650 against player 3", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "2");
        expect(stats.maxRating.win.elo).toBe(1650);
        expect(stats.maxRating.win.opponentId).toBe("3");
        expect(stats.maxRating.win.timestamp).toEqual(new Date("1/10/2020"));
    });
    it("player 2's worst loss is 1000 against player 1", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "2");
        expect(stats.maxRating.loss.elo).toBe(1000);
        expect(stats.maxRating.loss.opponentId).toBe("1");
        expect(stats.maxRating.loss.timestamp).toEqual(new Date("1/1/2019"));
    });
})