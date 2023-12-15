const User = require("../models/user");

async function generateUsername(email, firstName, lastName, maxLength) {
    const usernameExists = async (username) => {
        console.log("Checking if username exists:", username);
        const allUserNames = (await User.find({}))
            .filter((user) => user.username)
            .map((user) => user.username);
        console.log("usernames", username);
        return allUserNames.includes(username);
    };
    console.log(
        "Generating unique username... for ",
        firstName,
        lastName,
        email
    );

    let usernameAttempts = [];

    // Attempt 1: Use the part before '@' from email
    const emailUsername = email.substring(0, email.indexOf("@")).toLowerCase();
    if (emailUsername) {
        usernameAttempts.push(emailUsername);
    }

    // Attempt 2: Use first char of first name + last name or vice versa
    if (firstName && lastName) {
        usernameAttempts.push((firstName.charAt(0) + lastName).toLowerCase());
        usernameAttempts.push((firstName + lastName.charAt(0)).toLowerCase());
    }

    let username = "";
    for (const attempt of usernameAttempts) {
        if (!(await usernameExists(attempt))) {
            username = attempt;
            break;
        }
    }

    if (!username) {
        // If no unique username found from attempts, proceed as before
        if (!firstName || !lastName) {
            firstName = Math.random().toString(36).substring(2, 15);
            lastName = Math.random().toString(36).substring(2, 15);
        }
        let baseUsername = (firstName + lastName)
            .toLowerCase()
            .replace(/\s/g, ""); // Use first and last names
        username = baseUsername.slice(0, maxLength); // Truncate if it exceeds maxLength

        let counter = 1;
        while (
            (await usernameExists(username)) ||
            username.length > maxLength
        ) {
            const truncatedBase = baseUsername.slice(
                0,
                maxLength - counter.toString().length - 1
            );
            username = `${truncatedBase}_${counter}`; // Append a counter to make it unique
            counter++;
        }
    }

    return username;
}

module.exports = generateUsername;
