exports.toLowerCase = (str) => {
    return str.toLowerCase();
}

exports.toUpperCase = (str) => {
    return str.toUpperCase();
}

exports.toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}

exports.toSentenceCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

exports.toCamelCase = (str) => {
    return str.replace(/\W+(.)/g, (match, chr) => {
        return chr.toUpperCase();
    });
}

exports.toSnakeCase = (str) => {
    return str.replace(/\W+/g, "_");
}
