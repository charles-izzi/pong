import { TestData } from '../../testData';
import Stats from '@/business/stats/stats';

describe("Win Rate", () => {
    it("3-4 has win rate of 43", () => {
        const stats = new Stats(TestData.matches, "1");
        expect(stats.winRate.winRate).toBe(43);
        expect(stats.winRate.winCount).toBe(3);
        expect(stats.winRate.loseCount).toBe(4);
    });

    it("2-3 has win rate of 40", () => {
        const stats = new Stats(TestData.matches, "2");
        expect(stats.winRate.winRate).toBe(40);
        expect(stats.winRate.winCount).toBe(2);
        expect(stats.winRate.loseCount).toBe(3);
    });

    it("1-1 has win rate of 50", () => {
        const stats = new Stats(TestData.matches, "3");
        expect(stats.winRate.winRate).toBe(50);
        expect(stats.winRate.winCount).toBe(1);
        expect(stats.winRate.loseCount).toBe(1);
    });
});
