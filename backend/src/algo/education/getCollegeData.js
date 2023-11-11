// given a state generate all the cities in that state from collage_list.json

const path = require("path");
const Trie = require("./trie");
const { toLowerCase } = require("../../utils/caseConversion");

const getStates = () => {
    const fs = require("fs");
    const filePath = path.join(__dirname, "college_list.json");
    const rawdata = fs.readFileSync(filePath);
    const data = JSON.parse(rawdata);
    // make title case
    return Object.keys(data).map((state) =>
        state.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
    );
};

const getCities = (state) => {
    // convert state to lower case
    state = state.toLowerCase();
    const fs = require("fs");
    const filePath = path.join(__dirname, "college_list.json");
    const rawdata = fs.readFileSync(filePath);
    const data = JSON.parse(rawdata);
    return Object.keys(data[state]).map((city) =>
        city.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
    );
};

const getInstitute = (state, city) => {
    // convert to lower case
    state = state.toLowerCase();
    city = city.toLowerCase();
    const fs = require("fs");
    const filePath = path.join(__dirname, "college_list.json");
    const rawdata = fs.readFileSync(filePath);
    const data = JSON.parse(rawdata);
    const x = data[state][city];
    if (x) {
        return x.map((institute) =>
            institute.replace(/\w\S*/g, (w) =>
                w.replace(/^\w/, (c) => c.toUpperCase())
            )
        );
    } else {
        // create a user requestested institute

        return [];
    }
};

const getInstituteBasedOnName = async (institutionName) => {
    // convert to lower case
    institutionName = institutionName.toLowerCase();
    let output = [];
    // Load trie asynchronously
    const trie1 = await Trie.loadSerializeData();
    const suggestions = trie1.search(toLowerCase(institutionName));
    return suggestions;
};

module.exports = {
    getStates,
    getCities,
    getInstitute,
    getInstituteBasedOnName,
};

if (require.main === module) {
    // console.log(getStates());
    // console.log(getCities("Delhi"));
    // console.log(getInstitute("Delhi", "Dlhi"));
    // let x = await getInstituteBasedOnName("Delhi")
    // console.log(x);
}
