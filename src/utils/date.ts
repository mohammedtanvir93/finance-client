import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

dayjs.tz.setDefault(dayjs.tz.guess());

const getFormattedDatetime = (date: Date | null) => {
    if (!date) return;

    return dayjs(date)
        .local()
        .format('D MMM, YYYY h:mm A');
};

export { getFormattedDatetime };