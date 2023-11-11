const eligibleToBecomeMentor = (user) => {
    const profileComplitionStatus = {
        uploadProfilePicAndVideo: user.profilePicUrl && user.introVideo,
        addedAboutPastAndFuture: user.about && user.pastExp && user.futurePlans,
        addedEducationOrExperence:
            (user.experence || user.education) &&
            (user.education.length || user.experence.length),
        addedAtleast4Posts: user.posts && user.posts.length >= 4,
    };

    let percentageProfileComplete = 0;

    for (let key in profileComplitionStatus) {
        if (profileComplitionStatus[key]) {
            percentageProfileComplete +=
                100 / Object.keys(profileComplitionStatus).length;
        }
    }

    return {
        profileComplitionStatus: profileComplitionStatus,
        percentageProfileComplete: percentageProfileComplete,
    };
};

exports.eligibleToBecomeMentor = eligibleToBecomeMentor;
