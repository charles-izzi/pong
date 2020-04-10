import { MatchMaker } from "@/business/matchMaking/matchMaker";
import { Player } from "@/business/matchMaking/player";
import { TestData } from '../../testData';

let matchMaker = new MatchMaker(TestData.playerData, 6);
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
        matchMaker = new MatchMaker(TestData.playerData, 6);
        matchMaker.setPlayers(["1", "2", "3", "4", "5", "6"], []);
        expect(matchMaker.getMatches()).toEqual([
            TestData.plannedMatch("5", "6", 0, 50),
            TestData.plannedMatch("3", "4", 0, 50),
            TestData.plannedMatch("1", "2", 0, 50),
            TestData.plannedMatch("4", "6", 2, 100),
            TestData.plannedMatch("2", "5", 2, 150),
            TestData.plannedMatch("1", "3", 2, 100),
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
            [TestData.plannedMatch("5", "6", 0, 50), TestData.plannedMatch("3", "4", 0, 50)]
        );
        expect(matchMaker.getMatches()).toEqual([
            TestData.plannedMatch("7", "8", 0, 50),
            TestData.plannedMatch("5", "6", 0, 50),
            TestData.plannedMatch("3", "4", 0, 50),
            TestData.plannedMatch("1", "2", 0, 50),
            TestData.plannedMatch("6", "8", 2, 100),
            TestData.plannedMatch("5", "7", 2, 100),
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
            TestData.plannedMatch("3", "4", 0, 50),
            TestData.plannedMatch("1", "2", 0, 50),
            TestData.plannedMatch("6", "8", 2, 100),
            TestData.plannedMatch("5", "7", 2, 100),
            TestData.plannedMatch("2", "4", 2, 100),
            TestData.plannedMatch("1", "3", 2, 100),
        ]);
    });
    it("odd players match to the minimum rating differential player", () => {
        matchMaker.setPlayers(
            ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            [TestData.plannedMatch("3", "4", 0, 50), TestData.plannedMatch("1", "2", 0, 50)]
        );
        expect(matchMaker.getMatches()).toEqual([
            TestData.plannedMatch("3", "4", 0, 50),
            TestData.plannedMatch("1", "2", 0, 50),
            TestData.plannedMatch("9", "8", 1, 50),
            TestData.plannedMatch("6", "9", 2, 150),
            TestData.plannedMatch("5", "7", 2, 100),
            TestData.plannedMatch("2", "4", 2, 100),
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
