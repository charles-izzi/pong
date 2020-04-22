import { TestData } from '../../testData';
import Stats from '@/business/stats/stats';

describe("Fare Against", () => {
    it("player 3 is strong against player 2", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "3");
        expect(stats.fareAgainst.strong.fares).toEqual([
            { opponentId: "1", expected: 36, actual: 50 },
            { opponentId: "2", expected: 43, actual: 50 }
        ]);
    });
    it("player 3 isn't weak against anyone", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "3");
        expect(stats.fareAgainst.weak.fares).toEqual([]);
    });
    it("player 2 is strong against player 1", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "2");
        expect(stats.fareAgainst.strong.fares).toEqual([
            { opponentId: "1", expected: 43, actual: 50 }
        ]);
    });
    it("player 2 is weak against players 3", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "2");
        expect(stats.fareAgainst.weak.fares).toEqual([
            { opponentId: "3", expected: 57, actual: 50 }
        ]);
    });
    it("player 1 is strong against no one", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.fareAgainst.strong.fares).toEqual([]);
    });
    it("player 1 is weak against players 5, 3, 2", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.fareAgainst.weak.fares).toEqual([
            { opponentId: "5", expected: 76, actual: 50 },
            { opponentId: "3", expected: 64, actual: 50 },
            { opponentId: "2", expected: 57, actual: 50 }
        ]);
    });
    it("player 1 vs player 2 is weak", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1", "2");
        expect(stats.fareAgainst.weak.fares).toEqual([
            { opponentId: "2", expected: 57, actual: 50 }
        ]);
    });
    it("player 2 vs player 3 is weak", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "2", "3");
        expect(stats.fareAgainst.weak.fares).toEqual([
            { opponentId: "3", expected: 57, actual: 50 }
        ]);
    });
});
