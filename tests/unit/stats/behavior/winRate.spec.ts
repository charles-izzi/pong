import { TestData } from '../../testData';
import Stats from '@/business/stats/stats';

describe("Win Rate", () => {
    it("4-5 has win rate of 44", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.winRate.winRate).toBe(44);
        expect(stats.winRate.winCount).toBe(4);
        expect(stats.winRate.loseCount).toBe(5);
    });

    it("1-3 has win rate of 25", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "4");
        expect(stats.winRate.winRate).toBe(25);
        expect(stats.winRate.winCount).toBe(1);
        expect(stats.winRate.loseCount).toBe(3);
    });

    it("4-1 has win rate of 80", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "5");
        expect(stats.winRate.winRate).toBe(80);
        expect(stats.winRate.winCount).toBe(4);
        expect(stats.winRate.loseCount).toBe(1);
    });
});
