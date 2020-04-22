import { TestData } from '../../testData';
import Stats from '@/business/stats/stats';

describe("Streak", () => {
    it("player 1's longest win streak is 3 and losing streak is 4", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.streak.win.stat).toBe(3);
        expect(stats.streak.lose.stat).toBe(4);
    });

    it("player 2's longest win streak is 2 and losing streak is 2", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "2");
        expect(stats.streak.win.stat).toBe(2);
        expect(stats.streak.lose.stat).toBe(2);
    });

    it("player 4's longest win streak is 1 and losing streak is 3", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "4");
        expect(stats.streak.win.stat).toBe(1);
        expect(stats.streak.lose.stat).toBe(3);
    });

    it("player 1 vs player 2 longest win streak is 1 and losing streak is 1", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1", "2");
        expect(stats.streak.win.stat).toBe(1);
        expect(stats.streak.lose.stat).toBe(1);
    });

    it("player 2 vs player 3 longest win streak is 1 and losing streak is 1", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "2", "3");
        expect(stats.streak.win.stat).toBe(1);
        expect(stats.streak.lose.stat).toBe(1);
    });
});
