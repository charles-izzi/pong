import Stats from "@/business/stats/stats";
import { TestData } from '../../testData';
import moment from 'moment';
import { SHORTEST_DATE_FORMAT } from '@/constants';

describe("Rating vs Time", () => {
    it("player 1 has proper chronological rating vs time data", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "1");
        expect(stats.ratingVsTime.chartData?.labels).toEqual([
            "1/1",
            "1/2",
            "1/21",
            "2/1",
            "2/2",
            "2/21",
            "10/1",
            "2/1",
            "2/2",
            moment(new Date()).format(SHORTEST_DATE_FORMAT),
        ]);
        if (stats.ratingVsTime.chartData?.datasets)
            expect(stats.ratingVsTime.chartData?.datasets[0].data).toEqual([
                1000,
                1200,
                1300,
                1350,
                1400,
                1350,
                1300,
                1250,
                1100,
                1350,
            ]);
    });

    it("player 2 has proper chronological rating vs time data", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "2");
        expect(stats.ratingVsTime.chartData?.labels).toEqual([
            "1/1",
            "10/1",
            "10/10",
            "1/1",
            "1/2",
            "1/10",
            moment(new Date()).format(SHORTEST_DATE_FORMAT),
        ]);
        if (stats.ratingVsTime.chartData?.datasets)
            expect(stats.ratingVsTime.chartData?.datasets[0].data).toEqual([
                1500,
                1250,
                1250,
                1300,
                1250,
                1250,
                1300,
            ]);
    });

    //this test is dependent on the constant MAX_DATA_POINTS
    it("player 8 has rating vs time data divided into 20 data points", () => {
        const stats = new Stats(TestData.playerData, TestData.matches, "8");
        expect(stats.ratingVsTime.chartData?.labels).toEqual([
            "10/11",
            "10/12",
            "10/13",
            "10/15",
            "10/16",
            "10/18",
            "10/19",
            "10/21",
            "10/22",
            "10/24",
            "10/25",
            "10/26",
            "10/28",
            "10/29",
            "11/1",
            "11/2",
            "11/4",
            "11/5",
            "11/7",
            moment(new Date()).format(SHORTEST_DATE_FORMAT),
        ]);
        if (stats.ratingVsTime.chartData?.datasets)
            expect(stats.ratingVsTime.chartData?.datasets[0].data).toEqual([
                1200,
                1185,
                1170,
                1140,
                1125,
                1125,
                1140,
                1170,
                1185,
                1155,
                1140,
                1125,
                1095,
                1080,
                1050,
                1065,
                1095,
                1080,
                1050,
                1000,
            ]);
    });
});