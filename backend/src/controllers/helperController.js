const {
    getStates,
    getCities,
    getInstitute,
    getInstituteBasedOnName,
} = require("../algo/education/getCollegeData");

exports.getInfo = async (req, res) => {
    try {
        const [college] = [req.query.college];
        console.log(college)
        if (college) {
            const x = await getInstituteBasedOnName(college);
            return res.status(200).send({
                result: x,
                count: x.length,
                message: "Institutes fetched successfully",
            });
        }
        const [state, city] = [req.query.state, req.query.city];
        if (!state && !city) {
            const x = getStates();
            return res.status(200).send({
                result: x,
                count: x.length,
                message: "States fetched successfully",
            });
        }
        if (!city) {
            const x = getCities(state);
            return res.status(200).send({
                result: x,
                count: x.length,
                message: "Cities fetched successfully",
            });
        }
        const x = getInstitute(state, city);
        return res.status(200).send({
            result: x,
            count: x.length,
            message: "Institutes fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};
