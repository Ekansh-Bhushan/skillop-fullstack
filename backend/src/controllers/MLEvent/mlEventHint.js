const mlEventHintsSchema = require('../../models/MLEVENT/mlEventHints');

// Create a new hint for a specific questionId
exports.createHint = async (req, res) => {
    try {
        const { questionReference, content } = req.body;

        if (!questionReference || !content) {
            return res.status(400).send({
                result: false,
                message: 'Question reference and Hint content are required'
            });
        }

        const newHint = new mlEventHintsSchema({
            questionReference,
            content,
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
        const { questionReference, hintId } = req.params;

        const hint = await mlEventHintsSchema.findOne({ _id: hintId, questionReference });

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
