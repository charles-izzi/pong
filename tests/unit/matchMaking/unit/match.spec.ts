import { Match } from "@/business/matchMaking/match";
import { Player } from "@/business/matchMaking/player";
import { TestData } from '../../testData';

describe("Match Maker Match", () => {
    it("match is constructed properly with 1 argument", () => {
        const match = new Match(TestData.playerData);
        expect(match).toEqual({
            player1Id: "",
            player2Id: "",
            priority: 0,
            ratingDifferential: 0,
            playerData: TestData.playerData,
        });
    });
    it("match is constructed properly with 3 arguments", () => {
        const match = new Match(TestData.playerData, new Player("1"), new Player("2"));
        expect(match).toEqual({
            player1Id: "1",
            player2Id: "2",
            priority: 0,
            ratingDifferential: 50,
            playerData: TestData.playerData,
        });
    });
    it("getMatchRating of player1 and player2 returns 1350+1300=2650", () => {
        const match = new Match(TestData.playerData, new Player("1"), new Player("2"));
        expect(match.getMatchRating()).toBe(2650);
    });
    it("match.copy makes a clone of match", () => {
        const match = new Match(TestData.playerData, new Player("1"), new Player("2"));
        expect(match.copy()).not.toBe(match);
        expect(match.copy()).toEqual({
            player1Id: "1",
            player2Id: "2",
            priority: 0,
            ratingDifferential: 50,
            playerData: TestData.playerData,
        });
    });
});
