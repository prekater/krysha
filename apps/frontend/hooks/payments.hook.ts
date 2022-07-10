import {useEffect, useState} from "react";


export const usePayments = () => {

  const [payments, setPayments] = useState({
    "paymentStartOptions": [
      {
        "type": "START_OF_RENT",
        "isEnabled": false
      },
      {
        "type": "START_OF_MONTH",
        "isEnabled": false
      }
    ],
    "paymentTypeOptions": [
      {
        "type": "TWO_PAYMENTS",
        "priceAffect": 0,
        "isEnabled": false
      },
      {
        "type": "ONE_PAYMENT",
        "priceAffect": 0,
        "isEnabled": true
      },
    ],
  })

  useEffect(() => console.log(payments), [payments])

  const toggleStartOptions = (index) => {

    setPayments(prev => {
      const newState = {...prev}
      newState.paymentStartOptions[index].isEnabled = !newState.paymentStartOptions[index].isEnabled
      return newState
    })
  }

  const toggleTwoPayments = () => {
    setPayments(prev => {
      const newState = {...prev}
      newState.paymentTypeOptions[0].isEnabled = !newState.paymentTypeOptions[0].isEnabled
      return newState
    })
  }
  const setTwoPaymentsPriceAffect = (e) => {
    const {value} = e.target
    setPayments(prev => {
      const newState = {...prev}
      newState.paymentTypeOptions[0].priceAffect = Number(value)
      return newState
    })
  }

  return {
    payments,
    toggleTwoPayments,
    setTwoPaymentsPriceAffect,
    toggleStartOptions
  }

}

