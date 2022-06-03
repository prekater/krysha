import {useState} from "react";
import {Deposit} from "../types/deposit";
import {PeriodUnit, PriceUnit} from "../types/common";
import {TerminationRule} from "../types/termination-rule";
import {v4 as uuid} from 'uuid';


export type TermProps = {
  deposit: Deposit;
  periodFrom: number | string;
  periodTo: number | string;
  periodUnit: PeriodUnit | string,
  price: number | string,
  priceUnit: PriceUnit | string,
  ID: string,
  terminationRules: TerminationRule[]
}
export const useTerms = () => {

  const [terms, setTerms] = useState<TermProps[]>([])

  const onAddTerminationRule = (termIndex: number) => () =>  {

    const newTerms = [...terms];

    newTerms[termIndex].terminationRules.push({
      currency: 'RUB',
      period: '',
      periodUnit: 'months',
      value: ''
    } as any)

    setTerms(newTerms)
  }

  const onAddTerm = () => {
    setTerms(terms.concat([{
      deposit: {
        returnPeriod: '',
        returnPeriodUnit: '',
        value: '',
        collectType: '',
        returnType: 'RECALCULATE_PRICE',
      },
      periodFrom: '',
      periodTo: '',
      periodUnit: 'days',
      price: '',
      priceUnit: '',
      ID: uuid(),
      terminationRules: []
    } as any]))
  }

  const onChangeTerm = (i, key ) => (event) => {
    const path  = key.split('.')
    const tmp = [...terms]
    let reference = tmp[i]


    for ( let i =0; i< path.length -1; i++)  {

      reference =  reference[path[i]]
    }
    reference[path[path.length -1]] = event.target.value
    setTerms(tmp)
  }

  return {
    terms,
    onAddTerm,
    onChangeTerm,
    onAddTerminationRule
  }

}
