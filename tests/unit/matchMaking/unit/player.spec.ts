import { Player } from "@/business/matchMaking/player";

describe("Match Maker Player", () => {
    it("player is constructed properly with 1 argument", () => {
        const player = new Player("1");
        expect(player).toEqual({
            id: "1",
            gamesPlayed: 0,
            playersPlayed: new Set<string>(),
            isActive: true,
        });
    });
    it("player is constructed properly with 3 arguments", () => {
        const player = new Player(
            "1",
            3,
            new Set<string>(["2", "3", "4"]),
            false
        );
        expect(player).toEqual({
            id: "1",
            gamesPlayed: 3,
            playersPlayed: new Set<string>(["2", "3", "4"]),
            isActive: false,
        });
    });
    it("player can play player only if both active and haven't played each other", () => {
        const player1 = new Player("1");
        const player2 = new Player("2");
        expect(player1.canPlayPlayer(player2)).toBe(true);
        expect(player2.canPlayPlayer(player1)).toBe(true);
        player1.isActive = false;
        expect(player1.canPlayPlayer(player2)).toBe(false);
        expect(player2.canPlayPlayer(player1)).toBe(false);
        player1.isActive = true;
        player2.isActive = false;
        expect(player1.canPlayPlayer(player2)).toBe(false);
        expect(player2.canPlayPlayer(player1)).toBe(false);
        player2.isActive = true;
        player1.playersPlayed = new Set<string>(["2"]);
        expect(player1.canPlayPlayer(player2)).toBe(false);
        expect(player2.canPlayPlayer(player1)).toBe(false);
        player1.playersPlayed = new Set<string>();
        player2.playersPlayed = new Set<string>(["1"]);
        expect(player1.canPlayPlayer(player2)).toBe(false);
        expect(player2.canPlayPlayer(player1)).toBe(false);
        player1.playersPlayed = new Set<string>(["3"]);
        player2.playersPlayed = new Set<string>(["3"]);
        expect(player1.canPlayPlayer(player2)).toBe(true);
        expect(player2.canPlayPlayer(player1)).toBe(true);
    });
});
