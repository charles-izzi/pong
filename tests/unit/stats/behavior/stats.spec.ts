import { TestData } from '../../testData';
import Stats from '@/business/stats/stats';

describe("Stats", () => {
    it("player 1 has win rate stat, no strong stat, has weak stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.winRate.hasStat).toBe(true);
        expect(stats.fareAgainst.strong.hasStat).toBe(false);
        expect(stats.fareAgainst.weak.hasStat).toBe(true);
    });
    it("player 3 has win rate, has strong stat, no weak stat", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "3");
        expect(stats.winRate.hasStat).toBe(true);
        expect(stats.fareAgainst.strong.hasStat).toBe(true);
        expect(stats.fareAgainst.weak.hasStat).toBe(false);
    });
});
