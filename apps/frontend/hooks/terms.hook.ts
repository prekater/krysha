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

  const [terms, setTerms] = useState<TermProps[]>([{
    deposit: {
      returnPeriod: '',
      isEnabled: false,
      returnPeriodUnit: '',
      value: '',
      returnType: 'RECALCULATE_PRICE',
      collectOptions: [
        {
          type: 'ABSENT_WITH_EXTRA_CHARGE',
          priceAffect: 0,
          isEnabled: false
        },
        {
          type: 'PARTIAL',
          priceAffect: 0,
          isEnabled: false
        },

      ],
    },
    periodFrom: '',
    periodTo: '',
    periodUnit: 'days',
    price: '',
    priceUnit: '',
    ID: uuid(),
    terminationRules: [
      {
        currency: 'RUB',
        period: '',
        periodUnit: 'months',
        value: ''
      }
    ]
  }] as any)


  const onAddTerminationRule = (termIndex: number) => () => {

    const newTerms = [...terms];

    newTerms[termIndex].terminationRules.push({
      currency: 'RUB',
      period: '',
      periodUnit: 'months',
      value: ''
    } as any)

    setTerms(newTerms)
  }
  const onDeleteTerminationRule = (termIndex: number) => (terminationRuleIndex: number) => () => {
    const newTerms = [...terms];
    newTerms[termIndex].terminationRules.splice(terminationRuleIndex, 1)
    setTerms(newTerms)
  }


  const onDeleteTerm = (index: number) => () => {
    const newTerms = [...terms];


    newTerms.splice(index, 1)

    setTerms(newTerms)
  }
  const onAddTerm = () => {
    setTerms(terms.concat([{
      deposit: {
        returnPeriod: '',
        isEnabled: false,
        returnPeriodUnit: '',
        value: '',
        returnType: 'RECALCULATE_PRICE',
        collectOptions: [
          {
            type: 'ABSENT_WITH_EXTRA_CHARGE',
            priceAffect: 0,
            isEnabled: false
          },
          {
            type: 'PARTIAL',
            priceAffect: 0,
            isEnabled: false
          },

        ],
      },
      periodFrom: '',
      periodTo: '',
      periodUnit: 'days',
      price: '',
      priceUnit: '',
      ID: uuid(),
      terminationRules: [
        {
          currency: 'RUB',
          period: '',
          periodUnit: 'months',
          value: ''
        }
      ]
    } as any]))
  }

  const onChangeTerm = (i, key) => (event) => {

    let value = event?.target?.value ||
      (typeof event?.target?.checked === 'boolean' && String(event?.target?.checked))
      || event

    value = ["true", "false"].includes(value) ? /^\s*(true|1|on)\s*$/i.test(value) : value


    const path = key.split('.')
    const tmp = [...terms]
    let reference = tmp[i]


    for (let i = 0; i < path.length - 1; i++) {
      reference = reference[path[i]]
    }
    reference[path[path.length - 1]] = value
    setTerms(tmp)
  }

  return {
    terms,
    onAddTerm,
    onChangeTerm,
    onAddTerminationRule,
    onDeleteTerminationRule,
    onDeleteTerm
  }

}
