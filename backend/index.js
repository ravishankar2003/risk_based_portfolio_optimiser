import express, { json } from 'express';
import errorHandler from './error.js'; // Ensure to include the .js extension
import cors from 'cors';

import { totalCapital, calculateRiskLevel, calculateInvestments, ciReportPrint } from './controller.js'; // Ensure to include the .js extension

const app = express();
const port = 3000;

app.use(json());

app.use(cors({
    origin: 'https://ravishankar2003.github.io'
}));

app.post('/calculate', (req, res, next) => {
    const { startingYear, finalYear, initialAmount, iapa, iapaIncrement, expectedReturn } = req.body;
    //console.log(startingYear, finalYear, initialAmount, iapa, iapaIncrement, expectedReturn);
    
    if (!startingYear || !finalYear || !initialAmount || !iapa || !iapaIncrement || !expectedReturn) {
        next(errorHandler(400, "Please provide all the required fields"));
    } else {
        let ans = totalCapital(iapa, iapaIncrement, startingYear, finalYear, initialAmount);
        let riskLevel = calculateRiskLevel(expectedReturn, ans);
        let investments, ciReport;
        //console.log(ans);
        
        if (riskLevel !== "very low" && riskLevel !== "very high") {
            investments = calculateInvestments(expectedReturn, ans);
            //console.log(investments);
            ciReport = ciReportPrint(initialAmount, iapa, iapaIncrement, startingYear, finalYear, investments);
        }
        
        if (riskLevel === "very low") {
            res.json({
                message: "You can earn more for the same amount of risk",
                investments: null,
                ciReport: null,
                ans:ans
            });
        } else if (riskLevel === "very high") {
            res.json({
                message: "Your expectation comes with very high risk and is impractical",
                investments: null,
                ciReport: null,
                ans:ans
            });
        } else {
            res.json({
                message: `You can earn ${expectedReturn} with ${riskLevel} risk level`,
                investments: investments,
                ciReport: ciReport,
                ans:ans
            });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
