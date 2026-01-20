import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyinfo from './hooks/useCurrencyinfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyinfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = () => {
    if (!currencyInfo[to]) return
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/2522676/pexels-photo-2522676.jpeg')",
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-5 bg-white/30 backdrop-blur-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}
        >
          {/* FROM */}
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            selectCurrency={from}
            onCurrencyChange={setFrom}
            onAmountChange={setAmount}
          />

          {/* SWAP */}
          <div className="relative h-0.5 my-4">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={swap}
            >
              swap
            </button>
          </div>

          {/* TO */}
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            selectCurrency={to}
            onCurrencyChange={setTo}
            amountDisable
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white px-4 py-3 rounded-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
