const TestResult = require("../models/testresult.model");

exports.storeTestResults = async (req, res) => {
    try {
        const { results } = req.body;
        const userId = req.user.id;

        if (!results || results.length === 0) {
            return res.status(400).json({ error: "No results provided" });
        }

        // Insert all results in one go instead of looping with await (better performance)
        const formattedResults = results.map(result => ({
            userId,
            testName: result.testName,
            status: result.status,
            filePath: result.filePath,
            framework: result.framework,
            expectedResult: result.expectedResult,
            actualResult: result.actualResult,
            errorMessage: result.errorMessage,
            timestamp: new Date(result.timestamp)
        }));

        await TestResult.insertMany(formattedResults);

        res.json({ success: true, message: "Results stored successfully" });
    } catch (error) {
        console.error("Error storing test results:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
