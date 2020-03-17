import { Player } from "@/business/matchMaking/player";
import { playerData } from './matchMaker.spec';
import { Players } from '@/business/matchMaking/players';

let players = new Players();
players.setPlayers(["1", "2", "3", "4", "5", "6"]);


const player1 = new Player("1");
const player2 = new Player("2");
const player3 = new Player("3");
const player4 = new Player("4");
const player5 = new Player("5");
const player6 = new Player("6");
const player7 = new Player("7");
const player8 = new Player("8");
const player9 = new Player("9");

function testPlayerState(testName: string, stateAlteration: () => void, activePlayers: Player[], currentRoundPlayers: Player[]) {
    it(`${testName} - active players list`, () => {
        stateAlteration();
        expect(players.getActivePlayers()).toEqual(activePlayers);
    });
    it(`${testName} - current round players list`, () => {
        expect(players.getCurrentRoundPlayers()).toEqual(currentRoundPlayers);
    });
}

describe("Match Maker Players", () => {

    it("players are constructed properly with no arguments", () => {
        const _players = new Players();
        expect(_players).toEqual({
            players: [],
            playerDictionary: {},
            currentRound: 0
        });
    });
    it("players are constructed with copied array of players", () => {
        const _player1 = new Player("1");
        const _player2 = new Player("2");
        const _playerArr = [_player1, _player2];
        const _players = new Players(_playerArr);
        expect(_players).toEqual({players: [_player1, _player2],
            playerDictionary: { "1": _player1, "2": _player2 },
            currentRound: 0
        });
        expect(_players.players).toEqual(_playerArr);
        expect(_players.players).not.toBe(_playerArr);
        expect(_players.players[0]).toEqual(_player1);
        expect(_players.players[0]).not.toBe(_player1);
    });
    it("player pool init", () => {
        expect(players.players).toEqual([player1, player2, player3, player4, player5, player6]);
    });
    it("players contain set players", () => {
        expect(players.contains("1")).toBe(true);
        expect(players.contains("2")).toBe(true);
        expect(players.contains("3")).toBe(true);
        expect(players.contains("4")).toBe(true);
        expect(players.contains("5")).toBe(true);
        expect(players.contains("6")).toBe(true);
        expect(players.contains("7")).toBe(false);
        expect(players.contains("8")).toBe(false);
    });
    testPlayerState("set players", () => { }, [player1, player2, player3, player4, player5, player6], [player1, player2, player3, player4, player5, player6]);

    testPlayerState("add players", () => {
        players.setPlayers(["1", "2", "3", "4", "5", "6", "7"]);
    }, [player1, player2, player3, player4, player5, player6, player7], [player1, player2, player3, player4, player5, player6, player7]);


    const expectedPlayers6 = new Player(player6.id, player6.gamesPlayed, player6.playersPlayed, player6.isActive);
    expectedPlayers6.isActive = false;
    const expectedPlayers7 = new Player(player7.id, player7.gamesPlayed, player7.playersPlayed, player7.isActive);
    expectedPlayers7.isActive = false;
    testPlayerState("deactivate players", () => {
        players.setPlayers(["1", "2", "3", "4", "5"]);
    }, [player1, player2, player3, player4, player5], [player1, player2, player3, player4, player5, expectedPlayers6, expectedPlayers7]);

    it("memokey formed properly", () => {
        expect(players.getMemoKey(playerData)).toBe("abcdefg");
    });

    testPlayerState("remove player", () => {
        players.removeAt(3);
    }, [player1, player2, player3, player5], [player1, player2, player3, player5, expectedPlayers6, expectedPlayers7]);

    it("update players - 1 match", () => {
        players.updatePlayers([{ player1Id: "1", player2Id: "2", priority: 0 }])
        expect(players.players[0]).toEqual({ id: "1", gamesPlayed: 1, playersPlayed: new Set<string>(["2"]), isActive: true });
        expect(players.players[1]).toEqual({ id: "2", gamesPlayed: 1, playersPlayed: new Set<string>(["1"]), isActive: true });
    })

    it("update players - 3 match", () => {
        players.updatePlayers([
            { player1Id: "3", player2Id: "5", priority: 0 },
            { player1Id: "5", player2Id: "6", priority: 0 },
            { player1Id: "7", player2Id: "1", priority: 0 }
        ])
        expect(players.players[0]).toEqual({ id: "1", gamesPlayed: 2, playersPlayed: new Set<string>(["2", "7"]), isActive: true });
        expect(players.players[2]).toEqual({ id: "3", gamesPlayed: 1, playersPlayed: new Set<string>(["5"]), isActive: true });
        expect(players.players[3]).toEqual({ id: "5", gamesPlayed: 2, playersPlayed: new Set<string>(["3", "6"]), isActive: true });
        expect(players.players[4]).toEqual({ id: "6", gamesPlayed: 1, playersPlayed: new Set<string>(["5"]), isActive: false });
        expect(players.players[5]).toEqual({ id: "7", gamesPlayed: 1, playersPlayed: new Set<string>(["1"]), isActive: false });
    })
});
