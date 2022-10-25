import moment from "moment";
import 'moment/locale/pt-br';

export function pad(value) {
    return value.toString().padStart(2, '0');
}

export function getDatetime() {
    return moment().locale('pt-br').format('YYYY-MM-DD hh:mm:ss');
}

export function getCurrentMonth() {
    return moment().locale('pt-br').format("YYYY-MM");
}

export function formatMoney(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

export function updateSelectedMonth(month, number) {
    return moment(`${month}-01`).add(number, 'months').format("YYYY-MM");
}

export function addMonthsInADate(date, months) {
    return moment(date).add(months, 'months').format("YYYY-MM-DD");
}

export function convertDateToUsaFormat(date) {
    return date.split("/").reverse().join("-");
}

export function convertMoneyToFloat(money) {
    return parseFloat(money.toString().replaceAll(".", "").replace(",", "."));
}

export function getHeaderTitle(period) {
    const [year, month] = period.split("-");
    return `${getMonthDescription(month)} de ${year}`;
}

export function getMonthDescription(month) {
    month = parseInt(month);
    switch (month) {
        case 1:
            return "Janeiro";
        case 2:
            return "Fevereiro";
        case 3:
            return "Março";
        case 4:
            return "Abril";
        case 5:
            return "Maio";
        case 6:
            return "Junho";
        case 7:
            return "Julho";
        case 8:
            return "Agosto";
        case 9:
            return "Setembro";
        case 10:
            return "Outubro";
        case 11:
            return "Novembro";
        case 12:
            return "Dezembro";
    }
}

export function getDayOfWeekDescription(date) {
    return moment(date).locale('pt-br').format('dddd');
}

export function currencyMask(value) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return value;
}