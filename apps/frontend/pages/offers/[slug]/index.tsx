import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useRouter} from "next/router";
import {Box, Button, Container, Heading} from "@chakra-ui/react";
import {TermStep} from "../../../components/offers/TermStep";
import {OptionsStep} from "../../../components/offers/OptionsStep";
import {DepositStep} from "../../../components/offers/DepositStep";
import {RentalPeriodStep} from "../../../components/offers/RentalPeriodStep";
import {PaymentStep} from "../../../components/offers/PaymentStep";
import {reverseDate} from "../../../utils";

export async function getServerSideProps({params: {slug}}) {
  const res = await fetch(`http://ec2-44-200-125-244.compute-1.amazonaws.com:3333/api/offers/${slug}`)
  const data = await res.json()

  return {
    props: {data},
  }
}

const Offer = () => {
  const initialPeriod = {
    startDate: '',
    endDate: '',
  }
  const [offer, setOffer] = useState(null)
  const router = useRouter()
  const [period, setPeriod] = useState(initialPeriod)
  const [term, setTerm] = useState(null)
  const [step, setStep] = useState(1)
  const [isPrevDisabled, isNextDisabled] = [step === 1, step === 5 || step === 1 && !term]
  const [deposit, setDeposit] = useState(null)
  const [payment, setPayment] = useState(null)

  useEffect(() => console.log(period) , [period])
  useEffect(() => {
    offer && setPayment({
      ...offer.payment,
      paymentStartOptions: [
        ...offer.payment.paymentStartOptions
          .filter(o => o.isEnabled)
          .map(o => ({...o, isEnabled: false}))
      ],
      paymentTypeOptions: [
        ...offer.payment.paymentTypeOptions
          .filter(o => o.isEnabled)
          .map(o => ({...o, isEnabled: false}))
      ],
    })
  }, [offer])
  useEffect(() => {

    if (term) {
      setDeposit({
        ...term.deposit,
        collectOptions: [
          ...term.deposit.collectOptions
            .filter(o => o.isEnabled)
            .map(o => ({...o, isEnabled: false}))
        ]
      })
      setPeriod(initialPeriod)
    }
  }, [term])

  const onChangeDepositOption = (index: number, event: any) => {

    let value = event?.target?.value ||
      (typeof event?.target?.checked === 'boolean' && String(event?.target?.checked))
      || event

    value = ["true", "false"].includes(value) ? /^\s*(true|1|on)\s*$/i.test(value) : value

    setDeposit(prev => {
      prev.collectOptions[index].isEnabled = value
      return {...prev};
    })
  }
  const onChangePaymentOption = (type: string) => (index: number, event: any) => {

    let value = event?.target?.value ||
      (typeof event?.target?.checked === 'boolean' && String(event?.target?.checked))
      || event

    value = ["true", "false"].includes(value) ? /^\s*(true|1|on)\s*$/i.test(value) : value

    setPayment(prev => {
      prev[type][index].isEnabled = value
      return {...prev};
    })
  }

  const onChangeTerm = (ID: string) => setTerm(offer.terms.find(t => t.ID === ID))

  const {slug} = router.query

  useEffect(() => {

    (async () => {
      const res = await fetch(`http://ec2-44-200-125-244.compute-1.amazonaws.com:3333/api/offers/${slug}`)
      const data = await res.json()

      setOffer(data)
    })()

  }, [])

  if (!offer) return null;

  const onChangeRentalPeriod = key => (value) => {
    setPeriod(prevState => {
      return ({...prevState, [key]: value})
    })
  }

  const onSubmit = async () => {

    const payload = {
      offerId: offer.ID,
      termId: term.ID,
      rentalStart: new Date(reverseDate(period.startDate)).toLocaleDateString('ru-RU'),
      rentalEnd: period.endDate,
      depositOption: deposit.collectOptions.find(co => co.isEnabled)?.type || 'CONCLUSION',
      paymentStartOption: payment.paymentStartOptions.find(pso => pso.isEnabled)?.type,
      paymentTypeOption: payment.paymentTypeOptions.find(pto => pto.isEnabled)?.type,
    }

    const {data} = await axios.post(`http://ec2-44-200-125-244.compute-1.amazonaws.com:3333/api/contracts`, payload)


    router.push(`http://ec2-44-200-125-244.compute-1.amazonaws.com:3000/contracts/${data.resourceId}`)
  }

  return (
    <>
      <Container alignContent={'center'}>
        <Button disabled={isPrevDisabled} className={'prev-step'} colorScheme={'orange'}
                onClick={() => setStep(prevState => --prevState)}>Предыдущий шаг</Button>
        <Button disabled={isNextDisabled} className={'next-step'} colorScheme={'green'}
                onClick={() => setStep(prevState => ++prevState)}>Следующий шаг</Button>
      </Container>
      <Heading
        size='md'
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >Шаг {step} </Heading>
      <Box>
        {step === 1 && (
          <TermStep
            onChange={onChangeTerm}
            currentTerm={term}
            terms={offer.terms}
            termsContent={offer.termsContent}
          />
        )}
        {step === 2 && (
          <OptionsStep
            options={offer.options}
          />
        )}
        {step === 3 && (
          <DepositStep
            deposit={deposit}
            onChangeDepositOption={onChangeDepositOption}
          />
        )}
        {step === 4 && (
          <RentalPeriodStep
            range={[term.periodFrom, term.periodTo].slice(0, 2).map(Number)}
            onChange={onChangeRentalPeriod}
            unit={term.periodUnit}
            period={period}
          />
        )}
        {step === 5 && term && (
          <>
          <PaymentStep
            payment={payment}
            unit={term.periodUnit}
            onChangePaymentStart={onChangePaymentOption('paymentStartOptions')}
            onChangePaymentType={onChangePaymentOption('paymentTypeOptions')}
          />
            <Button  onClick={onSubmit} id={'create-contract'}>Сформировать контракт</Button>
          </>
        )}

      </Box>
    </>
  );
}

export default Offer;
