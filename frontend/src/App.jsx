import { useState } from 'react'
import Form from './components/form'
import Chart from './components/charts'
import { Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './index.css'

function App() {
  const [message, setMessage] = useState('')
  const [investments, setInvestments] = useState(null)
  const [ciReport, setCiReport] = useState(null)
  const [ans, setAns] = useState(null)
  


  return (
    <div className='flex flex-col bg-gray-100'>
    <div className="min-h-screen flex flex-col md:flex-row   items-center justify-center bg-gray-100 p-4">
      <Form setMessage={setMessage} setInvestments={setInvestments} setCiReport={setCiReport} setAns={setAns} ans={ans} message={message} />
      {investments && <Chart message={message} investments={investments} ciReport={ciReport} />}
    </div>
      {investments && <div className="m-6 p-4 rounded-xl bg-white shadow-xl">
        <h2 className="md:text-xl font-bold text-center text-sm">Cumulative Investment vs Cumulative Returns</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
            data={ciReport}
            margin={{
            top: 20,
            right: 30,
            left: 20,
             bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => parseFloat(value).toFixed(2)} />
            <Legend />
            {/* Bar for Cumulative Investment */}
            <Bar dataKey="cum_investment" stackId="a" fill="#4f46e5" name="Cumulative Investment" />
            {/* Bar for Cumulative Returns on top of Cumulative Investment */}
            <Bar dataKey="cum_returns" stackId="a" fill="#0088FE" name="Cumulative Returns" />
            </BarChart>
            </ResponsiveContainer>
    </div>}
    </div>
  );
}
  
export default App;
