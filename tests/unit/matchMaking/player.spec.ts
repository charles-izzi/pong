import { Player } from "@/business/matchMaking/player";

describe("Match Maker Player", () => {
    it("player is constructed properly with 1 argument", () => {
        const player = new Player("1");
        expect(player).toEqual({id: "1",
            gamesPlayed: 0,
            playersPlayed: new Set<string>(),
            isActive: true});
    });
    it("player is constructed properly with 3 arguments", () => {
        const player = new Player("1", 3, new Set<string>(["2", "3", "4"]), false);
        expect(player).toEqual({id: "1",
            gamesPlayed: 3,
            playersPlayed: new Set<string>(["2", "3", "4"]),
            isActive: false});
    });
});