import { MatchMaker } from "@/business/matchMaking/matchMaker";
import { IPlayers } from "@/store/players";
import { Player } from "@/business/matchMaking/player";
import { Match } from "@/business/matchMaking/match";

export const playerData: IPlayers = {
    "1": {
        player: "a",
        elo: 1350,
        rank: 1,
        hidden: false,
    },
    "2": {
        player: "b",
        elo: 1300,
        rank: 1,
        hidden: false,
    },
    "3": {
        player: "c",
        elo: 1250,
        rank: 1,
        hidden: false,
    },
    "4": {
        player: "d",
        elo: 1200,
        rank: 1,
        hidden: false,
    },
    "5": {
        player: "e",
        elo: 1150,
        rank: 1,
        hidden: false,
    },
    "6": {
        player: "f",
        elo: 1100,
        rank: 1,
        hidden: false,
    },
    "7": {
        player: "g",
        elo: 1050,
        rank: 1,
        hidden: false,
    },
    "8": {
        player: "h",
        elo: 1000,
        rank: 1,
        hidden: false,
    },
    "9": {
        player: "i",
        elo: 950,
        rank: 1,
        hidden: false,
    },
};

let matchMaker = new MatchMaker(playerData, 6);
matchMaker.setPlayers(["1", "2", "3", "4", "5", "6"], []);

const player1 = new Player("1");
const player2 = new Player("2");
const player3 = new Player("3");
const player4 = new Player("4");
const player5 = new Player("5");
const player6 = new Player("6");
const player7 = new Player("7");
const player8 = new Player("8");
const player9 = new Player("9");

describe("E2E Match Maker Typical Session", () => {
    it("getMatches gets the equal play, distinct, and least rating differential matches", () => {
        matchMaker = new MatchMaker(playerData, 6);
        matchMaker.setPlayers(["1", "2", "3", "4", "5", "6"], []);
        expect(matchMaker.getMatches()).toEqual([
            match("5", "6", 0, 50),
            match("3", "4", 0, 50),
            match("1", "2", 0, 50),
            match("4", "6", 2, 100),
            match("2", "5", 2, 150),
            match("1", "3", 2, 100),
        ]);
    });
    testPoolAndPlannedPlayers(
        "players get updated properly after first match",
        () => {
            //do nothing
        },
        [player1, player2, player3, player4, player5, player6],
        [
            new Player(
                "1",
                2,
                new Set<string>(["2", "3"]),
                true
            ),
            new Player(
                "2",
                2,
                new Set<string>(["1", "5"]),
                true
            ),
            new Player(
                "3",
                2,
                new Set<string>(["1", "4"]),
                true
            ),
            new Player(
                "4",
                2,
                new Set<string>(["3", "6"]),
                true
            ),
            new Player(
                "5",
                2,
                new Set<string>(["2", "6"]),
                true
            ),
            new Player(
                "6",
                2,
                new Set<string>(["4", "5"]),
                true
            ),
        ]
    );
    it("all but the passed-in matches get recalculated based on new player pool", () => {
        matchMaker.setPlayers(
            ["1", "2", "3", "4", "5", "6", "7", "8"],
            [match("5", "6", 0, 50), match("3", "4", 0, 50)]
        );
        expect(matchMaker.getMatches()).toEqual([
            match("7", "8", 0, 50),
            match("5", "6", 0, 50),
            match("3", "4", 0, 50),
            match("1", "2", 0, 50),
            match("6", "8", 2, 100),
            match("5", "7", 2, 100),
        ]);
    });
    testPoolAndPlannedPlayers(
        "player get updated after adding players",
        () => {
            //do nothing
        },
        [
            player1,
            player2,
            player3,
            player4,
            player5,
            player6,
            player7,
            player8,
        ],
        [
            new Player(
                "1",
                2,
                new Set<string>(["2", "3"]),
                true
            ),
            new Player(
                "2",
                2,
                new Set<string>(["1", "4"]),
                true
            ),
            new Player(
                "3",
                2,
                new Set<string>(["1", "4"]),
                true
            ),
            new Player(
                "4",
                2,
                new Set<string>(["2", "3"]),
                true
            ),
            new Player(
                "5",
                2,
                new Set<string>(["6", "7"]),
                true
            ),
            new Player(
                "6",
                2,
                new Set<string>(["5", "8"]),
                true
            ),
            new Player(
                "7",
                2,
                new Set<string>(["5", "8"]),
                true
            ),
            new Player(
                "8",
                2,
                new Set<string>(["6", "7"]),
                true
            ),
        ]
    );
    it("play removes match", () => {
        const matchPlay = matchMaker.getMatches()[0];
        matchMaker.playMatch(matchPlay);
        expect(matchMaker.getMatches().indexOf(matchPlay)).toBe(-1);
    });
    testPoolAndPlannedPlayers(
        "players get updated after playing first match",
        () => {
            //do nothing
        },
        [
            player1,
            player2,
            player3,
            player4,
            player5,
            player6,
            new Player(
                "7",
                1,
                new Set<string>(["8"]),
                true
            ),
            new Player(
                "8",
                1,
                new Set<string>(["7"]),
                true
            ),
        ],
        [
            new Player(
                "1",
                2,
                new Set<string>(["2", "3"]),
                true
            ),
            new Player(
                "2",
                2,
                new Set<string>(["1", "4"]),
                true
            ),
            new Player(
                "3",
                2,
                new Set<string>(["1", "4"]),
                true
            ),
            new Player(
                "4",
                2,
                new Set<string>(["2", "3"]),
                true
            ),
            new Player(
                "5",
                2,
                new Set<string>(["6", "7"]),
                true
            ),
            new Player(
                "6",
                2,
                new Set<string>(["5", "8"]),
                true
            ),
            new Player(
                "7",
                2,
                new Set<string>(["5", "8"]),
                true
            ),
            new Player(
                "8",
                2,
                new Set<string>(["6", "7"]),
                true
            ),
        ]
    );
    testPoolAndPlannedPlayers(
        "players get updated after playing second match",
        () => {
            matchMaker.playMatch(matchMaker.getMatches()[0]);
        },
        [
            player1,
            player2,
            player3,
            player4,
            new Player(
                "5",
                1,
                new Set<string>(["6"]),
                true
            ),
            new Player(
                "6",
                1,
                new Set<string>(["5"]),
                true
            ),
            new Player(
                "7",
                1,
                new Set<string>(["8"]),
                true
            ),
            new Player(
                "8",
                1,
                new Set<string>(["7"]),
                true
            ),
        ],
        [
            new Player(
                "1",
                2,
                new Set<string>(["2", "3"]),
                true
            ),
            new Player(
                "2",
                2,
                new Set<string>(["1", "4"]),
                true
            ),
            new Player(
                "3",
                2,
                new Set<string>(["1", "4"]),
                true
            ),
            new Player(
                "4",
                2,
                new Set<string>(["2", "3"]),
                true
            ),
            new Player(
                "5",
                2,
                new Set<string>(["6", "7"]),
                true
            ),
            new Player(
                "6",
                2,
                new Set<string>(["5", "8"]),
                true
            ),
            new Player(
                "7",
                2,
                new Set<string>(["5", "8"]),
                true
            ),
            new Player(
                "8",
                2,
                new Set<string>(["6", "7"]),
                true
            ),
        ]
    );
    it("get matches still follows rules after playing matches", () => {
        expect(matchMaker.getMatches()).toEqual([
            match("3", "4", 0, 50),
            match("1", "2", 0, 50),
            match("6", "8", 2, 100),
            match("5", "7", 2, 100),
            match("2", "4", 2, 100),
            match("1", "3", 2, 100),
        ]);
    });
    it("odd players match to the minimum rating differential player", () => {
        matchMaker.setPlayers(
            ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            [match("3", "4", 0, 50), match("1", "2", 0, 50)]
        );
        expect(matchMaker.getMatches()).toEqual([
            match("3", "4", 0, 50),
            match("1", "2", 0, 50),
            match("9", "8", 1, 50),
            match("6", "9", 2, 150),
            match("5", "7", 2, 100),
            match("2", "4", 2, 100),
        ]);
    });
    testPoolAndPlannedPlayers(
        "players get updated after match recalculation from added player",
        () => {
            //do nothing
        },
        [
            player1,
            player2,
            player3,
            player4,
            new Player(
                "5",
                1,
                new Set<string>(["6"]),
                true
            ),
            new Player(
                "6",
                1,
                new Set<string>(["5"]),
                true
            ),
            new Player(
                "7",
                1,
                new Set<string>(["8"]),
                true
            ),
            new Player(
                "8",
                1,
                new Set<string>(["7"]),
                true
            ),
            player9,
        ],
        [
            new Player(
                "1",
                2,
                new Set<string>(["2", "3"]),
                true
            ),
            new Player(
                "2",
                2,
                new Set<string>(["1", "4"]),
                true
            ),
            new Player(
                "3",
                2,
                new Set<string>(["1", "4"]),
                true
            ),
            new Player(
                "4",
                2,
                new Set<string>(["2", "3"]),
                true
            ),
            new Player(
                "5",
                2,
                new Set<string>(["6", "7"]),
                true
            ),
            new Player(
                "6",
                2,
                new Set<string>(["5", "9"]),
                true
            ),
            new Player(
                "7",
                2,
                new Set<string>(["5", "8"]),
                true
            ),
            new Player(
                "8",
                2,
                new Set<string>(["7", "9"]),
                true
            ),
            new Player(
                "9",
                2,
                new Set<string>(["8", "6"]),
                true
            ),
        ]
    );
});

function testPoolAndPlannedPlayers(
    name: string,
    setup: () => void,
    pool: Player[],
    planned: Player[]
) {
    it(`${name} - pool players`, () => {
        setup();
        expect(matchMaker.playerPool.players).toEqual(pool);
    });

    it(`${name} - planned players`, () => {
        expect(matchMaker.plannedPlayers.players).toEqual(planned);
    });
}

function match(
    id1: string,
    id2: string,
    priority: number,
    ratingDifferential: number
) {
    const match = new Match(playerData);
    match.player1Id = id1;
    match.player2Id = id2;
    match.priority = priority;
    match.ratingDifferential = ratingDifferential;
    return match;
}
