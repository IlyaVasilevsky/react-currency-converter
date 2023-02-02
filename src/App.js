import React, { useCallback } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [rates, setRates] = React.useState()

  const [fromCurrency, setFromCurrency] = React.useState('RUB')
  const [toCurrency, setToCurrency] = React.useState('USD')

  const [fromPrice, setFromPrice] = React.useState(0)
  const [toPrice, setToPrice] = React.useState(0)

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(res => res.json())
    .then(json => {
      setRates(json.Valute)
      console.log(rates)
    })
  }, [])

  const onChangeFromPrice = (value) => {
    if (fromCurrency === 'RUB') {

      if (toCurrency === 'RUB' ) {
        setToPrice(value)
      } else {
        const result = value / rates[toCurrency].Value
        setToPrice(result.toFixed(2))
      }

    } else {

      if (toCurrency === 'RUB') {
        const result = value * rates[fromCurrency].Value
        setToPrice(result.toFixed(2))
      } else {
        const price = value / rates[toCurrency].Value
        const result = price * rates[fromCurrency].Value
        setToPrice(result.toFixed(2))
      }
      
    } 
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    if (toCurrency === 'RUB') {

      if (fromCurrency === 'RUB') {
        setFromPrice(value)
      } else {
        const result = value / rates[fromCurrency].Value
        setFromPrice(result.toFixed(2))
      }

    } else {

      if (fromCurrency === 'RUB') {
        const result = value * rates[toCurrency].Value
        setFromPrice(result.toFixed(2))
      } else {
        const price = value / rates[fromCurrency].Value
        const result = price * rates[toCurrency].Value
        setFromPrice(result.toFixed(2))
      }

    }
    setToPrice(value)
  }

  // React.useEffect(() => {
  //   onChangeFromPrice(fromPrice)
  // }, [fromCurrency,  fromPrice])

  // React.useEffect(() => {
  //   onChangeToPrice(toPrice)
  // }, [toCurrency, toPrice])


  const clear = () => {
    setFromPrice(0)
    setToPrice(0)
  }

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice} 
        clear={clear}
      />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice} 
        clear={clear}
      />
    </div> 
  )
}

export default App;
