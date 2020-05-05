/**
 * Created by aditya on 28/5/18.
 */

const addZeroBefore = number => {
    number += '';
    if (number.length < 2) return '0' + number;
    return number;
};

const DateFilter = (date, isTimeShow, dateFormat = 'DD-MM-YYYY') => {

    const DD = date.getDate() < 10 ? '0' + ( date.getDate() ) : ( date.getDate() );

    let MM = (date.getMonth() + 1) < 10 ? '0' + ( date.getMonth() + 1 ) : ( date.getMonth() + 1 );

    const YYYY = date.getFullYear();

    const HH = date.getHours();

    const Minuites = date.getMinutes();

    /**
     * formated time
     * @stategy AM|PM
     * @type {string}
     */
    const time = (HH > 12 ? addZeroBefore(HH - 12) : addZeroBefore(HH)) + ':' + addZeroBefore(Minuites) + ' ' + (HH > 11 ? 'PM' : 'AM');

    /**
     * last two character of year value
     * @type {string}
     */
    const YY = YYYY % 1000;

    /**
     * let result
     */
    let resultDate = date;

    const monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
    ];

    switch (dateFormat) {
    case 'F':
        const day = date.getDate(); // eslint-disable-line no-case-declarations

        // const lastIndex = newDate % 10;
        let dateSuffix; // eslint-disable-line no-case-declarations

        switch (day) {
        case 1:
            dateSuffix = 'st';
            break;
        case 2:
            dateSuffix = 'nd';
            break;
        case 3:
            dateSuffix = 'rd';
            break;
        default:
            dateSuffix = 'th';
        }

        const monthIndex = date.getMonth(); // eslint-disable-line no-case-declarations

        resultDate = day + dateSuffix + ' ' + monthNames[monthIndex] + ' ' + YYYY;

        break;
    default:

        /**
         * replace object
         * @type {{DD: number, MM: number, YYYY: number, YY: string}}
         */
        const mapObj = { // eslint-disable-line no-case-declarations
            DD: DD,
            MM: MM,
            F: monthNames[date.getMonth()],
            YYYY: YYYY,
            YY: YY
        };

        resultDate = dateFormat.replace(/DD|MM|F|YYYY|YY/gi, function (matched) {
            return mapObj[matched];
        });

        break;

    }

    return isTimeShow ? resultDate + ' ' + time : resultDate;
};

export default DateFilter;
