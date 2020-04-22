import Vue from "vue";
import moment from "moment";

Vue.filter("date", (value: string) => {
    if (!value) return "";
    const d = moment(value);
    if (!d.isValid()) return "";
    return d.format("M/D/YY");
})
