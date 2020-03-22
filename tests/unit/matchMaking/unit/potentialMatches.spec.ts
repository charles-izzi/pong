import { PotentialMatches } from "@/business/matchMaking/potentialMatches";
import { Player } from "@/business/matchMaking/player";
import { Match } from "@/business/matchMaking/match";
import { playerData } from "../behavior/matchMaker.spec";

describe("Match Maker Potential Matches", () => {
    it("potential matches constructed without odd player", () => {
        const potentialMatches = new PotentialMatches(null);
        expect(potentialMatches).toEqual({
            matches: [],
            oddPlayer: null,
        });
    });
    it("potential matches constructed with odd player", () => {
        const player1 = new Player("1");
        const potentialMatches = new PotentialMatches(player1);
        expect(potentialMatches).toEqual({
            matches: [],
            oddPlayer: player1,
        });
    });
    it("add match adds a copy of match", () => {
        const potentialMatches = new PotentialMatches(null);
        const match = new Match(playerData, new Player("1"), new Player("2"));
        potentialMatches.add(match);
        expect(potentialMatches.matches).toEqual([match]);
        expect(potentialMatches.matches[0]).not.toBe(match);
    });
    it("copy potential matches ", () => {
        const player1 = new Player("1");
        const player2 = new Player("2");
        const player3 = new Player("3");
        const potentialMatches = new PotentialMatches(player3);
        const match = new Match(playerData, player1, player2);
        potentialMatches.add(match);
        const copy = potentialMatches.copy();
        expect(copy).toEqual(potentialMatches);
        expect(copy).not.toBe(potentialMatches);
        expect(copy.matches[0]).toEqual(match);
        expect(copy.matches[0]).not.toBe(match);
        expect(copy.oddPlayer).toEqual(player3);
        expect(copy.oddPlayer).not.toBe(player3);
    });
});
