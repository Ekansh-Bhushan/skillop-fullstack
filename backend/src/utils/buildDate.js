exports.getDate = (date, time) => {
    const meetDate = new Date(date);
    meetDate.setHours(parseInt(time / 100));
    meetDate.setMinutes(parseInt(time % 100));
    meetDate.setSeconds(0);
    return meetDate;
};
