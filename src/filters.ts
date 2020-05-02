import Vue from "vue";
import moment from "moment";
import { SHORT_DATE_FORMAT } from './constants';

Vue.filter("date", (value: string) => {
    if (!value) return "";
    const d = moment(value);
    if (!d.isValid()) return "";
    return d.format(SHORT_DATE_FORMAT);
})
