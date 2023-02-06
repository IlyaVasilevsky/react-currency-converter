import React from 'react';
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
      const obj = json.Valute
      obj.RUB = {Value: 1}      
      setRates(obj) 
    })
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / rates[toCurrency].Value
    const result = price * rates[fromCurrency].Value
    setToPrice(result.toFixed(2))
    setFromPrice(value)
  } 

  const onChangeToPrice = (value) => {
    const price = value / rates[fromCurrency].Value
    const result = price * rates[toCurrency].Value
    setFromPrice(result.toFixed(2))
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
