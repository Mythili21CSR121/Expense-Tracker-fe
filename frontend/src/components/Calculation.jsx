import React, { useState, useEffect } from 'react'
import publicRequest from './../requestMethods'

const Calculation = () => {
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchDataAndCalculateExpense = async () => {
      try {
        const res = await publicRequest.get('/expenses') // Ensure this matches your server setup
        const fetchedData = res.data
        console.log(fetchedData) // Log the API response

        if (Array.isArray(fetchedData)) {
          setData(fetchedData)

          const totalExpense = fetchedData
            .filter(item => item.transactionType === 'debit')
            .reduce((acc, curr) => acc + curr.amount, 0)
          setExpense(totalExpense)

          const totalIncome = fetchedData
            .filter(item => item.transactionType === 'credit')
            .reduce((acc, curr) => acc + curr.amount, 0)
          setIncome(totalIncome)

          setTotal(totalIncome - totalExpense)
        } else {
          console.error('Fetched data is not an array:', fetchedData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDataAndCalculateExpense()
  }, []) // Remove `data` from dependency array to avoid infinite loop

  return (
    <div className='flex flex-col bg-gray-800 text-white items-center gap-3 py-5 rounded-xl shadow-lg px-5'>
      <div className='flex flex-col items-center gap-1 px-8 w-full'>
        <h2 className='font-semibold text-base text-gray-400'>TOTAL BALANCE</h2>
        <h1 className='font-bold text-3xl text-green-400'></h1>
        {total >= 0 ? (
          <h1 className='font-bold text-3xl text-green-400'>+₹{total}</h1>
        ) : (
          <h1 className='font-bold text-3xl text-red-400'>
            -₹{Math.abs(total)}
          </h1>
        )}
      </div>
      <div className='flex items-center justify-evenly'>
        <div className='flex flex-col items-center px-8'>
          <h2 className='font-semibold text-base text-gray-400'>INCOME</h2>
          <h1 className='font-bold text-2xl text-green-400'>+₹{income}</h1>
        </div>
        <div className='flex flex-col items-center px-8'>
          <h2 className='font-semibold text-base text-gray-400'>EXPENSES</h2>
          <h1 className='font-bold text-2xl text-red-400'>-₹{expense}</h1>
        </div>
      </div>
    </div>
  )
}

export default Calculation
