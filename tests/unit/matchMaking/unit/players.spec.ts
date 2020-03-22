import { Player } from "@/business/matchMaking/player";
import { playerData } from "../behavior/matchMaker.spec";
import { Players } from "@/business/matchMaking/players";
import { Match } from "@/business/matchMaking/match";

describe("Match Maker Players", () => {
    it("players are constructed properly with no arguments", () => {
        const players = new Players();
        expect(players).toEqual({
            players: [],
            playerDictionary: {},
            currentRound: 0,
        });
    });
    it("players are constructed with copied array of players", () => {
        const player1 = new Player("1");
        const player2 = new Player("2");
        const playerArr = [player1, player2];
        const players = new Players(playerArr);
        expect(players).toEqual({
            players: [player1, player2],
            playerDictionary: { "1": player1, "2": player2 },
            currentRound: 0,
        });
        expect(players.players).toEqual(playerArr);
        expect(players.players).not.toBe(playerArr);
        expect(players.players[0]).toEqual(player1);
        expect(players.players[0]).not.toBe(player1);
    });
    it("players add new players", () => {
        const player1 = new Player("1");
        const player2 = new Player("2");
        const player3 = new Player("3");
        const playerList = [player1, player2, player3];
        const players = new Players();
        players.setPlayers(playerList.map((x: Player) => x.id));
        expect(players.players).toEqual(playerList);
    });
    it("new players get set to latest round", () => {
        const player1 = new Player("1");
        player1.gamesPlayed = 3;
        const player2 = new Player("2");
        player2.gamesPlayed = 4;
        const player3 = new Player("3");
        player3.gamesPlayed = 5;
        const players = new Players([player1, player2, player3]);
        players.setPlayers(["1", "2", "3", "4"]);
        expect(players.players[3].gamesPlayed).toBe(3);
    });
    it("set players deactivates missing players and activates present inactive players", () => {
        const player1 = new Player("1");
        player1.isActive = false;
        const player2 = new Player("2");
        const player3 = new Player("3");
        const players = new Players([player1, player2, player3]);
        players.setPlayers(["1", "2"]);
        expect(players.players[0].isActive).toBe(true);
        expect(players.players[1].isActive).toBe(true);
        expect(players.players[2].isActive).toBe(false);
    });
    it("players contain right players", () => {
        const player1 = new Player("1");
        player1.isActive = false;
        const player2 = new Player("2");
        const player3 = new Player("3");
        const players = new Players([player1, player2, player3]);
        expect(players.contains("1")).toBe(true);
        expect(players.contains("2")).toBe(true);
        expect(players.contains("3")).toBe(true);
        expect(players.contains("4")).toBe(false);
        expect(players.contains("5")).toBe(false);
    });
    it("removeAt removes player", () => {
        const player1 = new Player("1");
        player1.isActive = false;
        const player2 = new Player("2");
        const player3 = new Player("3");
        const players = new Players([player1, player2, player3]);
        players.removeAt(2);
        expect(players.players.length).toBe(2);
        expect(players.contains("1")).toBe(true);
        expect(players.contains("2")).toBe(true);
        expect(players.contains("3")).toBe(false);
    });
    it("getActivePlayers gets active players", () => {
        const player1 = new Player("1");
        player1.isActive = false;
        player1.gamesPlayed++;
        const player2 = new Player("2");
        player2.gamesPlayed++;
        const player3 = new Player("3");
        const players = new Players([player1, player2, player3]);
        expect(players.getActivePlayers()).toEqual([player2, player3]);
    });
    it("getCurrentRoundPlayers gets current round players", () => {
        const player1 = new Player("1");
        player1.isActive = false;
        player1.gamesPlayed++;
        const player2 = new Player("2");
        player2.gamesPlayed++;
        const player3 = new Player("3");
        const players = new Players([player1, player2, player3]);
        expect(players.getCurrentRoundPlayers()).toEqual([player3]);
        players.players[2].gamesPlayed++;
        player3.gamesPlayed++;
        expect(players.getCurrentRoundPlayers()).toEqual([
            player1,
            player2,
            player3,
        ]);
    });
    it("updatePlayers increments games played", () => {
        const players = new Players([
            new Player("1"),
            new Player("2"),
            new Player("3"),
            new Player("4"),
            new Player("5"),
        ]);
        players.updatePlayers([
            { player1Id: "1", player2Id: "2", priority: 0 },
            { player1Id: "2", player2Id: "3", priority: 0 },
        ]);
        expect(players.players[0].gamesPlayed).toBe(1);
        expect(players.players[1].gamesPlayed).toBe(2);
        expect(players.players[2].gamesPlayed).toBe(1);
        expect(players.players[3].gamesPlayed).toBe(0);
        expect(players.players[4].gamesPlayed).toBe(0);
    });
    it("updatePlayers adds to players played", () => {
        const players = new Players([
            new Player("1"),
            new Player("2"),
            new Player("3"),
            new Player("4"),
            new Player("5"),
        ]);
        players.updatePlayers([
            { player1Id: "1", player2Id: "2", priority: 0 },
            { player1Id: "2", player2Id: "3", priority: 0 },
        ]);
        expect(players.players[0].playersPlayed).toEqual(
            new Set<string>(["2"])
        );
        expect(players.players[1].playersPlayed).toEqual(
            new Set<string>(["1", "3"])
        );
        expect(players.players[2].playersPlayed).toEqual(
            new Set<string>(["2"])
        );
        expect(players.players[3].playersPlayed).toEqual(new Set<string>());
        expect(players.players[4].playersPlayed).toEqual(new Set<string>());
    });
    it("updatePlayers resets players played when they've played everyone", () => {
        const players = new Players([
            new Player("1"),
            new Player("2"),
            new Player("3"),
            new Player("4"),
            new Player("5"),
        ]);
        players.updatePlayers([
            { player1Id: "1", player2Id: "2", priority: 0 },
            { player1Id: "2", player2Id: "3", priority: 0 },
        ]);
        players.updatePlayers([
            { player1Id: "4", player2Id: "2", priority: 0 },
            { player1Id: "5", player2Id: "2", priority: 0 },
        ]);
        expect(players.players[0].playersPlayed).toEqual(
            new Set<string>(["2"])
        );
        expect(players.players[1].playersPlayed).toEqual(new Set<string>());
        expect(players.players[2].playersPlayed).toEqual(
            new Set<string>(["2"])
        );
        expect(players.players[3].playersPlayed).toEqual(
            new Set<string>(["2"])
        );
        expect(players.players[4].playersPlayed).toEqual(
            new Set<string>(["2"])
        );
    });
});
