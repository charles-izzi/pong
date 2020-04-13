import { TestData } from '../../testData';
import Stats from '@/business/stats/stats';

describe("Fare Against", () => {
    it("player 3 is strong against player 2", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "3");
        expect(stats.strongAgainst.fares).toEqual([
            { opponentId: "2", expected: 43, actual: 100 }
        ]);
    });
    it("player 3 is weak against player 1", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "3");
        expect(stats.weakAgainst.fares).toEqual([
            { opponentId: "1", expected: 36, actual: 0 }
        ]);
    });
    it("player 2 is strong against players 4, 1", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "2");
        expect(stats.strongAgainst.fares).toEqual([
            { opponentId: "4", expected: 64, actual: 100 },
            { opponentId: "1", expected: 43, actual: 50 }
        ]);
    });
    it("player 2 is weak against players 5, 3", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "2");
        expect(stats.weakAgainst.fares).toEqual([
            { opponentId: "5", expected: 70, actual: 0 },
            { opponentId: "3", expected: 57, actual: 0 }
        ]);
    });
    it("player 1 is strong against players 3, 4", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.strongAgainst.fares).toEqual([
            { opponentId: "3", expected: 64, actual: 100 },
            { opponentId: "4", expected: 70, actual: 100 }
        ]);
    });
    it("player 1 is weak against players 7, 6, 5", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.weakAgainst.fares).toEqual([
            { opponentId: "7", expected: 85, actual: 0 },
            { opponentId: "6", expected: 81, actual: 0 },
            { opponentId: "5", expected: 76, actual: 0 }
        ]);
    });
});
