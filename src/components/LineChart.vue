<script>
import { Line } from "vue-chartjs";
export default {
    extends: Line,
    data() {
        return {
            options: {
                legend: {
                    display: false,
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        };
    },
    props: {
        chartdata: {
            type: Object,
            default: null,
        },
    },
    watch: {
        chartdata() {
            this.renderChart(this.chartdata, this.options);
        },
    },
    mounted() {
        this.renderChart(this.chartdata, this.options);
    },
};
</script>
<style scoped>
div {
    position: relative;
    height: 35vh;
}
</style>