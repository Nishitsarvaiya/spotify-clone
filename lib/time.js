export const formatDuration = (duration_ms) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return seconds == 60 ? minutes + 1 + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export const formatDate = (isoDate) => {
    const timeStamp = new Date(isoDate);
    var now = new Date(),
        secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if (secondsPast < 60) {
        return secondsPast + ' seconds ago';
    }
    if (secondsPast < 3600) {
        return parseInt(secondsPast / 60) + ' minutes ago';
    }
    if (secondsPast <= 86400) {
        return parseInt(secondsPast / 3600) + ' hours ago';
    }
    if (secondsPast <= 2628000) {
        return parseInt(secondsPast / 86400) + ' days ago';
    }
    if (secondsPast > 2628000) {
        return timeStamp.toDateString().substring(4, 10) + ', ' + timeStamp.toDateString().substring(11);
    }
};
