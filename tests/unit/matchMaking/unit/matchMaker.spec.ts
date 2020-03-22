import { MatchMaker } from "@/business/matchMaking/matchMaker";
import { playerData } from "../behavior/matchMaker.spec";
import { Players } from "@/business/matchMaking/players";
import { Player } from "@/business/matchMaking/player";
import { Match } from "@/business/matchMaking/match";

describe("Match Maker", () => {
    it("match maker is constructed properly", () => {
        const matchMaker = new MatchMaker(playerData, 6);
        expect(matchMaker).toEqual({
            playerPool: new Players(),
            plannedPlayers: new Players(),
            matches: [],
            memo: {},
            playerData: playerData,
            matchCount: 6,
        });
    });

    it("match maker resets planned players on setPlayer and matches properly", () => {
        const matchMaker = new MatchMaker(playerData, 4);
        const player1 = new Player("1");
        const player2 = new Player("2");
        const player3 = new Player("3");
        const playerList = [player1, player2, player3];
        matchMaker.plannedPlayers = new Players(playerList);
        matchMaker.playerPool = new Players(matchMaker.plannedPlayers.players);
        matchMaker.plannedPlayers.players[0].gamesPlayed = 5;
        matchMaker.plannedPlayers.players[0].playersPlayed = new Set<string>([
            "1",
            "2",
            "3",
            "4",
            "5",
        ]);
        matchMaker.setPlayers(
            playerList.map((x: Player) => x.id),
            []
        );
        const match1 = new Match(playerData, player1, player2);
        const match2 = new Match(playerData, player3, player2);
        match2.priority = 1;
        const match3 = new Match(playerData, player1, player3);
        match3.priority = 2;
        const match4 = new Match(playerData, player1, player2);
        match4.priority = 4;
        expect(matchMaker.getMatches()).toEqual([
            match1,
            match2,
            match3,
            match4,
        ]);
    });
});
