import React, {useState} from 'react'

const form = ({setMessage , setCiReport, setInvestments, setAns ,ans, message}) => {
    const [startingYear, setStartingYear] = useState("")
    const [finalYear, setFinalYear] = useState("")
    const [initialAmount, setInitialAmount] = useState("")
    const [iapa, setIapa] = useState("")
    const [iapaIncrement, setIapaIncrement] = useState("")
    const [expectedReturn, setExpectedReturn] = useState("")
  
    async function fetchData(e) {
      e.preventDefault(); // Prevent the default form submission
      const response = await fetch('https://risk-based-portfolio-optimiser.onrender.com/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startingYear,
          finalYear,
          initialAmount,
          iapa,
          iapaIncrement,
          expectedReturn,
        }),
      })
      const data = await response.json()
      setMessage(data.message)
      setInvestments(data.investments)
      setCiReport(data.ciReport)
      setAns(data.ans)

      console.log(data)
    }
  
    // Generate an array of years for the dropdown
    const years = Array.from({ length: 12 }, (_, i) => 2020 + i); // Creates an array from 2020 to 2031
  
    return (
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Calculate your Investments</h1>
          <form onSubmit={fetchData}>
            <label className="block mb-4">
              <span className="text-gray-700">Select the starting year:</span>
              <select
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                value={startingYear}
                onChange={(e) => {
                  setStartingYear(e.target.value);
                  setFinalYear(null); // Reset finalYear when startingYear changes
                }}
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Select the final year:</span>
              <select
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                value={finalYear}
                onChange={(e) => setFinalYear(e.target.value)}
                disabled={!startingYear} // Disable if startingYear is not selected
              >
                <option value="">Select Year</option>
                {startingYear && Array.from({ length: 13 }, (_, i) => parseInt(startingYear) + i + 1).map((year) => (
                  year <= 2032 && (
                    <option key={year} value={year}>{year}</option>
                  )
                ))}
              </select>
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Enter intial investable amount as of starting year:</span>
              <input
                type="number"
                className="block w-full mt-1 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Enter investable amount per annum :</span>
              <input
                type="number"
                className="block w-full mt-1 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2"
                value={iapa}
                onChange={(e) => setIapa(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Enter the yearly rate of increment for investable amount in percentage:</span>
              <input
                type="number"
                className="block w-full mt-1 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2"
                value={iapaIncrement}
                onChange={(e) => setIapaIncrement(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Enter final amount at the end of final year :</span>
              <input
                type="number"
                className="block w-full mt-1 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
              />
            </label>
            {ans && (<label className="block mb-4">
                    <span className="text-gray-700">Adjust expected return:</span>
                    <div className="flex items-center justify-between">
                        <input
                            type="range"
                            min={ans.p1} // Set the minimum value as needed
                            max={ans.p4}// Set the maximum value as needed
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(parseInt(e.target.value))}
                            className="w-full mx-2"
                        />
                    </div>
                </label>)}
                {message &&<><p className="text-center text-red-500 pb-4">{message}</p>

                
                </> }

            <button 
              type="submit" 
              onClick={fetchData}
              className="w-full bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition"
            >
              Calculate
            </button>
          </form>
        </div>
    )
  }

export default form