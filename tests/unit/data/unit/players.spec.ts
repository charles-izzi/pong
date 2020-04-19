import Players from "@/business/data/players";
import Player from '@/business/data/player';

describe("Data Players", () => {
    it("players constructed with no arguments has empty hash and list", () => {
        const players = new Players();
        expect(players.hash).toEqual({});
        expect(players.list).toEqual([]);
    });
    it("players constructed with IPlayers gets its hash and list filled", () => {
        const player1 = {
            id: "1",
            player: "a",
            elo: 1350,
            rank: 1,
            hidden: false,
        };
        const player2 = {
            id: "2",
            player: "b",
            elo: 1300,
            rank: 1,
            hidden: false,
        };
        const player3 = {
            id: "3",
            player: "c",
            elo: 1250,
            rank: 1,
            hidden: false,
        };
        const players = new Players({
            "1": player1,
            "2": player2,
            "3": player3,
        });
        expect(players.hash).toEqual({
            "1": new Player(player1),
            "2": new Player(player2),
            "3": new Player(player3),
        });
        expect(players.list).toEqual([
            new Player(player1),
            new Player(player2),
            new Player(player3)
        ]);
    });
    it("addPlayer adds player to hash and list", () => {
        const player1 = {
            id: "1",
            player: "a",
            elo: 1350,
            rank: 1,
            hidden: false,
        }
        const players = new Players({ "1": player1 });
        const player2 = {
            id: "2",
            player: "b",
            elo: 1300,
            rank: 1,
            hidden: false,
        };
        players.addPlayer(new Player(player2));
        expect(players.hash).toEqual({
            "1": new Player(player1),
            "2": new Player(player2)
        });
        expect(players.list).toEqual([
            new Player(player1),
            new Player(player2)
        ]);
    });
    it("updatePlayer updates player in hash and list", () => {
        const player = {
            id: "1",
            player: "a",
            elo: 1350,
            rank: 1,
            hidden: false,
        }
        const players = new Players({ "1": player });
        player.elo = 1400;
        players.updatePlayer(new Player(player));
        expect(players.hash).toEqual({
            "1": new Player(player)
        });
        expect(players.list).toEqual([
            new Player(player)
        ]);
    });
    it("getName gets player name", () => {
        const players = new Players({
            "1": {
                id: "1",
                player: "a",
                elo: 1350,
                rank: 1,
                hidden: false,
            }
        });
        expect(players.getName("1")).toBe("a");
    });
});