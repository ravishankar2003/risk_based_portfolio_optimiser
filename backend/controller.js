// constants

// returns
const bonds_return = 6.5, m_large_returns = 10.7, m_med_returns = 11.25, m_small_returns = 11.85, gold_returns = 9.3;

// p1 % constants
const p1_bonds = 60, p1_m_large = 10, p1_m_med = 7, p1_m_small = 3, p1_gold = 20;

// p2 % constants
const p2_bonds = 44.82, p2_m_large = 12.07, p2_m_med = 11.72, p2_m_small = 14.13, p2_gold = 17.24;

// p3 % constants
const p3_bonds = 28.57, p3_m_large = 14.28, p3_m_med = 16.78, p3_m_small = 26.06, p3_gold = 14.28;

// p4 % constants
const p4_bonds = 20, p4_m_large = 15, p4_m_med = 20, p4_m_small = 35, p4_gold = 10;



function getReturn(allocationPerc, initialAmount, iapa, iapaIncrement, rateOfReturn, startingYear, finalYear) {
    let fvCurr = initialAmount * (allocationPerc / 100);
    let iapa1 = iapa * (allocationPerc / 100);
    rateOfReturn = rateOfReturn / 100;
    const iapaIncrement1 = iapaIncrement / 100;
    let i = startingYear;
    i++;
    for (i; i <= finalYear; i++) {
        const contribution = iapa1 * Math.pow((1 + iapaIncrement1), (i - startingYear - 1));
        fvCurr = (fvCurr + contribution) * (1 + rateOfReturn);
        
        // Debugging: Log intermediate values
        //console.log(`Year: ${i}, Contribution: ${contribution.toFixed(2)}, Future Value: ${fvCurr.toFixed(2)}`);
    }

    return fvCurr;
}


function totalCapital(iapa, iapaIncrement, startingYear, finalYear, initialAmount) {
    const p1_total = 
        getReturn(p1_bonds, initialAmount, iapa, iapaIncrement, bonds_return, startingYear, finalYear) +
        getReturn(p1_m_large, initialAmount, iapa, iapaIncrement, m_large_returns, startingYear, finalYear) +
        getReturn(p1_m_med, initialAmount, iapa, iapaIncrement, m_med_returns, startingYear, finalYear) +
        getReturn(p1_m_small, initialAmount, iapa, iapaIncrement, m_small_returns, startingYear, finalYear) +
        getReturn(p1_gold, initialAmount, iapa, iapaIncrement, gold_returns, startingYear, finalYear);

    const p2_total = 
        getReturn(p2_bonds, initialAmount, iapa, iapaIncrement, bonds_return, startingYear, finalYear) +
        getReturn(p2_m_large, initialAmount, iapa, iapaIncrement, m_large_returns, startingYear, finalYear) +
        getReturn(p2_m_med, initialAmount, iapa, iapaIncrement, m_med_returns, startingYear, finalYear) +
        getReturn(p2_m_small, initialAmount, iapa, iapaIncrement, m_small_returns, startingYear, finalYear) +
        getReturn(p2_gold, initialAmount, iapa, iapaIncrement, gold_returns, startingYear, finalYear);

    const p3_total = 
        getReturn(p3_bonds, initialAmount, iapa, iapaIncrement, bonds_return, startingYear, finalYear) +
        getReturn(p3_m_large, initialAmount, iapa, iapaIncrement, m_large_returns, startingYear, finalYear) +
        getReturn(p3_m_med, initialAmount, iapa, iapaIncrement, m_med_returns, startingYear, finalYear) +
        getReturn(p3_m_small, initialAmount, iapa, iapaIncrement, m_small_returns, startingYear, finalYear) +
        getReturn(p3_gold, initialAmount, iapa, iapaIncrement, gold_returns, startingYear, finalYear);

    const p4_total = 
        getReturn(p4_bonds, initialAmount, iapa, iapaIncrement, bonds_return, startingYear, finalYear) +
        getReturn(p4_m_large, initialAmount, iapa, iapaIncrement, m_large_returns, startingYear, finalYear) +
        getReturn(p4_m_med, initialAmount, iapa, iapaIncrement, m_med_returns, startingYear, finalYear) +
        getReturn(p4_m_small, initialAmount, iapa, iapaIncrement, m_small_returns, startingYear, finalYear) +
        getReturn(p4_gold, initialAmount, iapa, iapaIncrement, gold_returns, startingYear, finalYear);


    //console.log(p1_total, p2_total, p3_total, p4_total);
    return { p1: p1_total, p2: p2_total, p3: p3_total, p4: p4_total };
}





function calculateRiskLevel(expectedReturn, ans) {
    if (expectedReturn < ans.p1) {
        return "very low";
    } else if (expectedReturn >= ans.p1 && expectedReturn < ans.p2) {
        return "low";
    } else if (expectedReturn >= ans.p2 && expectedReturn < ans.p3) {
        return "medium";
    } else if (expectedReturn >= ans.p3 && expectedReturn <= ans.p4) {
        return "high";
    } else if (expectedReturn > ans.p4) {
        return "very high";
    }
}



function calculateInvestments(expected_return, ans) {
    let f_bond, f_m_large, f_m_med, f_m_small, f_gold;

    if (ans.p1 <= expected_return && expected_return < ans.p2) {
        let i_bond = p2_bonds - (((ans.p2 - expected_return) / (ans.p2 - ans.p1)) * (p2_bonds - p1_bonds));
        let i_m_large = p2_m_large - (((ans.p2 - expected_return) / (ans.p2 - ans.p1)) * (p2_m_large - p1_m_large));
        let i_m_med = p2_m_med - (((ans.p2 - expected_return) / (ans.p2 - ans.p1)) * (p2_m_med - p1_m_med));
        let i_m_small = p2_m_small - (((ans.p2 - expected_return) / (ans.p2 - ans.p1)) * (p2_m_small - p1_m_small));
        let i_gold = p2_gold + (((ans.p2 - expected_return) / (ans.p2 - ans.p1)) * (p1_gold - p2_gold));

        f_bond = (i_bond / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_m_large = (i_m_large / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_m_med = (i_m_med / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_m_small = (i_m_small / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_gold = (i_gold / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
    } else if (ans.p2 <= expected_return && expected_return < ans.p3) {
        let i_bond = p3_bonds - (((ans.p3 - expected_return) / (ans.p3 - ans.p2)) * (p3_bonds - p2_bonds));
        let i_m_large = p3_m_large - (((ans.p3 - expected_return) / (ans.p3 - ans.p2)) * (p3_m_large - p2_m_large));
        let i_m_med = p3_m_med - (((ans.p3 - expected_return) / (ans.p3 - ans.p2)) * (p3_m_med - p2_m_med));
        let i_m_small = p3_m_small - (((ans.p3 - expected_return) / (ans.p3 - ans.p2)) * (p3_m_small - p2_m_small));
        let i_gold = p3_gold + (((ans.p3 - expected_return) / (ans.p3 - ans.p2)) * (p2_gold - p3_gold));

        f_bond = (i_bond / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_m_large = (i_m_large / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_m_med = (i_m_med / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_m_small = (i_m_small / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_gold = (i_gold / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
    } else if (ans.p3 <= expected_return && expected_return <= ans.p4) {
        let i_bond = p4_bonds - (((ans.p4 - expected_return) / (ans.p4 - ans.p3)) * (p4_bonds - p3_bonds));
        let i_m_large = p4_m_large - (((ans.p4 - expected_return) / (ans.p4 - ans.p3)) * (p4_m_large - p3_m_large));
        let i_m_med = p4_m_med - (((ans.p4 - expected_return) / (ans.p4 - ans.p3)) * (p4_m_med - p3_m_med));
        let i_m_small = p4_m_small - (((ans.p4 - expected_return) / (ans.p4 - ans.p3)) * (p4_m_small - p3_m_small));
        let i_gold = p4_gold + (((ans.p4 - expected_return) / (ans.p4 - ans.p3)) * (p3_gold - p4_gold));

        f_bond = (i_bond / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_m_large = (i_m_large / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_m_med = (i_m_med / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_m_small = (i_m_small / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
        f_gold = (i_gold / (i_bond + i_m_large + i_m_med + i_m_small + i_gold)) * 100;
    }

    return { f_bond, f_m_large, f_m_med, f_m_small, f_gold };
}


function ciReportPrint(initialAmount, iapa, iapaIncrement, startingYear, finalYear, tobe_invested) {
    const f_bond = tobe_invested.f_bond;
    const f_m_large = tobe_invested.f_m_large;
    const f_m_med = tobe_invested.f_m_med;
    const f_m_small = tobe_invested.f_m_small;
    const f_gold = tobe_invested.f_gold;
    const ciReport = [];

    let fvCurr1 = initialAmount * (f_bond / 100);
    let fvCurr2 = initialAmount * (f_m_large / 100);
    let fvCurr3 = initialAmount * (f_m_med / 100);
    let fvCurr4 = initialAmount * (f_m_small / 100);
    let fvCurr5 = initialAmount * (f_gold / 100);
    let iapa1 = iapa;
    let iapa2 = 0;
    let i = startingYear;
    i++;

    for (i; i <= finalYear; i++) {
        fvCurr1 = (fvCurr1 + iapa * (f_bond / 100) * Math.pow((1 + Number(iapaIncrement) / 100), (i - startingYear - 1))) * (1 + bonds_return / 100);
        fvCurr2 = (fvCurr2 + iapa * (f_m_large / 100) * Math.pow((1 + Number(iapaIncrement) / 100), (i - startingYear - 1))) * (1 + m_large_returns / 100);
        fvCurr3 = (fvCurr3 + iapa * (f_m_med / 100) * Math.pow((1 + Number(iapaIncrement) / 100), (i - startingYear - 1))) * (1 + m_med_returns / 100);
        fvCurr4 = (fvCurr4 + iapa * (f_m_small / 100) * Math.pow((1 + Number(iapaIncrement) / 100), (i - startingYear - 1))) * (1 + m_small_returns / 100);
        fvCurr5 = (fvCurr5 + iapa * (f_gold / 100) * Math.pow((1 + Number(iapaIncrement) / 100), (i - startingYear - 1))) * (1 + gold_returns / 100);
        
        iapa2 = Number(iapa2)+ Number(iapa1);
        iapa1 *= (Number(iapaIncrement) / 100 + 1); ;

        const cumInv = Math.round((Number(initialAmount) + Number(iapa2)) * 100) / 100;
        const cumRet = Math.round((fvCurr1 + fvCurr2 + fvCurr3 + fvCurr4 + fvCurr5 - cumInv) * 100) / 100;
        const fvCurr = Math.round((fvCurr1 + fvCurr2 + fvCurr3 + fvCurr4 + fvCurr5) * 100) / 100;

        ciReport.push({ year: i, cum_investment: cumInv, cum_returns: cumRet, total_value: fvCurr });
    }

    return ciReport;
}

export { totalCapital, calculateRiskLevel,  calculateInvestments, ciReportPrint };


