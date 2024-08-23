const mlEventHintsSchema = require('../../models/MLEVENT/mlEventHints'); 

// Create a new hint for a specific questionId
exports.createHint = async (req, res) => {
    try {
        const { questionId, hintText } = req.body;

        if (!questionId || !hintText) {
            return res.status(400).send({
                result: false,
                message: 'Question ID and Hint text are required'
            });
        }

        const newHint = new mlEventHintsSchema({
            questionId,
            hintText,
        });

        await newHint.save();

        res.status(201).send({
            result: true,
            hint: newHint,
            message: 'Hint created successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            err: error.message,
            message: 'Internal server error',
            result: false,
        });
    }
};

// Get a specific hint by questionId and hintId
exports.getHintById = async (req, res) => {
    try {
        const { questionId, hintId } = req.params;

        const hint = await mlEventHintsSchema.findOne({ _id: hintId, questionId });

        if (!hint) {
            return res.status(404).send({
                result: false,
                message: 'Hint not found for this question'
            });
        }

        res.status(200).send({
            result: true,
            hint,
            message: 'Hint retrieved successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            err: error.message,
            message: 'Internal server error',
            result: false,
        });
    }
};

