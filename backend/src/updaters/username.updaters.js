const mongoose = require("mongoose");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(`${process.env.MongoURL}/${process.env.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const allUserNames = [];
async function usernameExists(username) {
    console.log("Checking if username exists:", username);
    console.log(allUserNames);
    if (allUserNames.includes(username)) {
        console.log("Username already exists:", username);
        return true;
    }
    console.log("Username does not exist:", username);
    return false;
}

async function generateUsername(email, firstName, lastName, maxLength) {
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
async function updateExistingUsers() {
    try {
        let users = await User.find({}); // Fetch all users

        for (const user of users) {
            if (user.username) {
                allUserNames.push(user.username);
            }
        }

        for (const user of users) {
            try {
                if (!user.username) {
                    const uniqueUsername = await generateUsername(
                        user.email,
                        user.firstname,
                        user.lastname,
                        10
                    ); // Change '10' to your desired max length

                    user.username = uniqueUsername;
                    allUserNames.push(uniqueUsername);
                    await user.save(); // Update the user with the generated unique username
                }
            } catch (error) {
                console.error("Error updating username for user:", user);
                console.error(error);

                // validaton error then delete
                if (error.name === "ValidationError")
                    await User.deleteOne({ _id: user._id });
            }
        }
        console.log("Usernames updated.");
        mongoose.disconnect();
    } catch (error) {
        // catch user validation failed error

        console.error("Error updating usernames:", error);
    }
}

updateExistingUsers();
