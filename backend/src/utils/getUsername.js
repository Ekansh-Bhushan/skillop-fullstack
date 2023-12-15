const getUsername = (text) => {
    // username inclue alphanumeric and underscore
    const usernames = text.match(/@[a-z0-9_]+/gi);
    if (!usernames) return [];
    return usernames.map((username) => username.slice(1));
};

module.exports = getUsername;
