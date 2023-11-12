const fs = require("fs");
const path = require("path");
const { toLowerCase } = require("../../utils/caseConversion");

class TrieNode {
    constructor() {
        this.children = {};
        this.institutionInfo = null;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(institutionName, city, state, college) {
        let current = this.root;
        for (let char of institutionName) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.institutionInfo = { city, state, college };
    }

    search(prefix) {
        let current = this.root;
        for (let char of prefix) {
            if (!current.children[char]) {
                return [];
            }
            current = current.children[char];
        }
        return this.getAllInstitutions(current);
    }

    getAllInstitutions(node) {
        let result = [];
        if (node) {
            if (node.institutionInfo) {
                result.push(node.institutionInfo);
            }
            for (let childNode of Object.values(node.children)) {
                let childResult = this.getAllInstitutions(childNode);
                result = result.concat(childResult);
            }
        }
        return result;
    }

    saveSerializedData(fileName = "trie.json") {
        // Convert trie object to JSON (excluding methods)
        const p = path.join(__dirname, fileName);
        const serializedTrie = JSON.stringify(
            this,
            (key, value) => {
                if (typeof value === "function") {
                    return undefined; // Exclude methods
                }
                return value;
            },
            2
        );

        // Save the serialized Trie object to a file
        fs.writeFile(p, serializedTrie, (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return;
            }
            console.log("Trie has been saved to " + fileName);
        });
    }

    static loadSerializeData(fileName = "trie.json") {
        const p = path.join(__dirname, fileName);
        return new Promise((resolve, reject) => {
            // Load the serialized Trie object from file
            fs.readFile(p, "utf8", (err, data) => {
                if (err) {
                    console.error("Error reading file:", err);
                    reject(err);
                    return;
                }

                // Parse the JSON data
                const parsedData = JSON.parse(data);

                // Reconstruct Trie class and methods
                const trie = new Trie();
                Object.assign(trie, parsedData);
                resolve(trie);
            });
        });
    }
}

module.exports = Trie;

if (require.main === module) {
    // read the data from college_list_as_college_key.json
    const filePath = path.join(__dirname, "college_list_as_college_key.json");
    const rawdata = fs.readFileSync(filePath);
    const data = JSON.parse(rawdata);

    // Create and populate the trie
    const trie = new Trie();
    for (let institution in data) {
        trie.insert(
            institution,
            data[institution].city,
            data[institution].state,
            data[institution].college
        );
    }

    // Save the trie
    trie.saveSerializedData();
}
