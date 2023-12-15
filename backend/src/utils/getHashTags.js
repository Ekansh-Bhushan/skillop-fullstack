const getHashTags = (text) => {
    const hashTags = text.match(/#[a-z0-9]+/gi);
    console.log(hashTags, "hashTags", text)
    if(!hashTags) return [];
    return hashTags.map((hashTag) => hashTag.slice(1));
};

module.exports = getHashTags;
