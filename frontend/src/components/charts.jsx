import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const Chart = ({ message, ciReport, investments }) => {
    const [activeIndex, setActiveIndex] = useState(null);
  
    // Data for the pie chart
    const investmentData = investments ? [
        { name: 'Bonds', value: investments.f_bond },
        { name: 'Gold', value: investments.f_gold },
        { name: 'Large Cap Mutual Funds', value: investments.f_m_large },
        { name: 'Medium Cap Mutual Funds', value: investments.f_m_med },
        { name: 'Small Cap Mutual Funds', value: investments.f_m_small },
    ] : [];
  
    // Colors for each slice of the pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A8A8A8'];
    const DARKER_COLORS = ['#0056A3', '#008C76', '#C69A1D', '#C76E31'];

    // Function to download CSV
    const downloadCSV = () => {
        const csvRows = [];
        const headers = ['Year', 'Cumulative Investment', 'Cumulative Returns', 'Total Value'];
        csvRows.push(headers.join(',')); // Add header row

        ciReport.forEach(item => {
            const values = [
                item.year,
                item.cum_investment.toFixed(2),
                item.cum_returns.toFixed(2),
                item.total_value.toFixed(2)
            ];
            csvRows.push(values.join(',')); // Add data rows
        });

        // Create a blob and URL for the CSV file
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        // Create a temporary link to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'investment_report.csv'; // Specify the file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); // Clean up
        URL.revokeObjectURL(url); // Release the blob URL
    };

    return (
        <div className="container mx-auto flex-col py-2 md:py-0 md:px-4 justify-center">
            
            {ciReport && (
                <>
                    {/* Pie Chart for Investments */}
                    <div className="flex flex-col justify-center shadow-lg rounded-xl bg-white mx-auto">
                        <h1 className="text-2xl font-bold text-center mt-2 ">% investments</h1>
                        <PieChart width={400} height={400} className="flex justify-center mx-auto">
                            <Pie
                                data={investmentData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                                activeIndex={activeIndex}
                                onMouseEnter={(_, index) => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                {investmentData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        stroke="#ffffff"
                                        strokeWidth={2}
                                        fill={activeIndex === index ? DARKER_COLORS[index % COLORS.length] : COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => parseFloat(value).toFixed(2)} />
                            <Legend className="flex" />
                        </PieChart>
                    </div>
                </>
            )}

            {investments && (
                <>
                    <div className="flex md:flex-row gap-3 mt-4 items-center mx-auto justify-center">
                        <h1 className="text-2xl font-bold text-center">Investment Report</h1>
                        <div className="text-center">
                            <button
                                onClick={downloadCSV}
                                className="underline text-blue-500 hover:text-blue-700 text-sm font-semibold focus:outline-none"
                            >
                                Download CSV
                            </button>
                        </div>
                    </div>

                    {/* Investment Report Table */}
                    <div className="overflow-x-auto rounded-xl shadow-lg">
                        <div className="overflow-y-auto max-h-80">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="py-2 px-4 border">Year</th>
                                        <th className="py-2 px-4 border">Cumulative Investment</th>
                                        <th className="py-2 px-4 border">Cumulative Returns</th>
                                        <th className="py-2 px-4 border">Total Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ciReport.map((item) => (
                                        <tr key={item.year} className="text-center">
                                            <td className="py-2 px-4 border">{item.year}</td>
                                            <td className="py-2 px-4 border">{item.cum_investment.toFixed(2)}</td>
                                            <td className="py-2 px-4 border">{item.cum_returns.toFixed(2)}</td>
                                            <td className="py-2 px-4 border">{item.total_value.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

export default Chart;
