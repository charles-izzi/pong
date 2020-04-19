import Player from "@/business/data/player";

describe("Data Player", () => {
    it("Player constructor fills out properties", () => {
        const player = new Player({
            id: "1",
            player: "a",
            elo: 1200,
            rank: 1,
            hidden: false
        });
        expect(player).toEqual({
            id: "1",
            player: "a",
            elo: 1200,
            rank: 1,
            hidden: false
        });
    });
});