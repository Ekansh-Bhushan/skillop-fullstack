
const mlEventQuestionSchema = require('../../models/MLEVENT/mlEventQuestions');

exports.createQuestion = async (req, res) => {
    try {
        const newQuestion = await mlEventQuestionSchema.create(req.body);
        res.status(201).json({
            success: true,
            data: newQuestion
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


exports.getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await mlEventQuestionSchema.findById(id);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        res.status(200).json({
            success: true,
            data: question
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


