import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import clsx from 'clsx';
import axios from 'axios';

import {ChooseTermStep} from '../../offers-choose/ChooseOfferStep';
import {DepositStep} from '../../offers-choose/DepositStep';
import {OfferPageHeader} from '../OfferPageHeader';

import {ArrowBackIcon} from '../../../public/images/svgIcons/ArrowBackIcon';

import {chooseStepTitles, chooseStepDescriptions} from '../constants';

import styles from './OfferChooseCtepLayout.module.scss';
import {PeriodStep} from '../../offers-choose/PeriodStep';
import {PaymentStep} from '../../offers-choose/PaymentsStep';
import {CheckStep} from '../../offers-choose/CheckStep';

type Props = {
  offer: any
}

export const OfferChooseStepLayout = ({offer}: Props) => {
  const initialPeriod = {
    startDate: '',
    endDate: '',
  }
  const USER_INITIAL_STATE = {
    fullname: '',
    email: ''
  }

  const [landlord, setLandlord] = useState(USER_INITIAL_STATE)
  const [employer, setEmployer] = useState(USER_INITIAL_STATE)

  const router = useRouter()
  const [period, setPeriod] = useState(initialPeriod)
  const [term, setTerm] = useState(offer.terms[0])
  const [step, setStep] = useState<number>(1);
  const [deposit, setDeposit] = useState(null)
  const [payment, setPayment] = useState(null)
  const [isPrevDisabled, isNextDisabled] = [step === 1, step === 5];

  useEffect(() => {
  }, [payment])

  useEffect(() => {
    const payload = {
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
    }

    payload.paymentStartOptions[0].isEnabled = true;
    payload.paymentTypeOptions[0].isEnabled = true;

    offer && setPayment(payload)
  }, [offer])
  useEffect(() => {

    const depositPayload = {
      ...term.deposit,
      collectOptions: [
        ...term.deposit.collectOptions
          .filter(o => o.isEnabled)
          .map(o => ({...o, isEnabled: false}))
      ]
    }

    console.log(depositPayload.collectOptions, term.deposit.collectOptions)
    if (term) {
      setDeposit(depositPayload)
      setPeriod(initialPeriod)
    }
  }, [term])

  if (!offer) return null;

  const onChangeDepositOption = (index: number, event: any) => {

    let value = event?.target?.value ||
      (typeof event?.target?.checked === 'boolean' && String(event?.target?.checked))
      || event

    value = ["true", "false", "on"].includes(value) ? /^\s*(true|1|on)\s*$/i.test(value) : value

    setDeposit(prev => {
      prev.collectOptions = prev.collectOptions.map(o => ({...o, isEnabled: false}))
      prev.collectOptions[index].isEnabled = value
      return {...prev};
    })
  }
  const setDefaultDeposit = () => {
    setDeposit({
      ...term.deposit,
      collectOptions: [
        ...term.deposit.collectOptions
          .filter(o => o.isEnabled)
          .map(o => ({...o, isEnabled: false}))
      ]
    })
  }
  const onChangePaymentOption = (type: string) => (index: number, event: any) => {

    let value = event?.target?.value ||
      (typeof event?.target?.checked === 'boolean' && String(event?.target?.checked))
      || event

    value = ["true", "false"].includes(value) ? /^\s*(true|1|on)\s*$/i.test(value) : value

    setPayment(prev => {
      prev[type] = prev[type].map(po => ({...po, isEnabled: false}))
      prev[type][index].isEnabled = value
      return {...prev};
    })
  }
  const onChangeTerm = (ID: string) => setTerm(offer.terms.find(t => t.ID === ID))
  const onChangeRentalPeriod = key => (value) => {
    setPeriod(prevState => {
      return ({...prevState, [key]: value})
    })
  }

  const onSubmit = async () => {
    const payload = {
      offerId: offer.ID,
      termId: term.ID,
      rentalStart: period.startDate,
      rentalEnd: period.endDate,
      depositOption: deposit.collectOptions.find(co => co.isEnabled)?.type || (deposit.isEnabled ? 'CONCLUSION' : 'ABSENT'),
      paymentStartOption: payment.paymentStartOptions.find(pso => pso.isEnabled)?.type,
      paymentTypeOption: payment.paymentTypeOptions.find(pto => pto.isEnabled)?.type,
    }

    const {data: {resourceId}} = await axios.post(`http://ec2-3-94-232-213.compute-1.amazonaws.com:3333/api/contracts`, payload)

    await axios.post(
      `http://ec2-3-94-232-213.compute-1.amazonaws.com:3333/api/contracts/${resourceId}/export`, {
        landlord,
        employer
      }
    )

    router.push(`http://ec2-3-94-232-213.compute-1.amazonaws.com:3000/`)
  }

  const desktopBtnClassName = clsx(styles.backBtn, [styles.backBtn__web]);
  const mobileBtnClassName = clsx(styles.backBtn, [styles.backBtn__mobile]);

  const makeStepDescriptionClassName = (step: number) =>
    clsx(styles.stepDescription, styles[`stepDescription_step${step}`]);

  return (
    <>
      <OfferPageHeader step={step}/>
      <main className={styles.root}>
        <aside className={styles.textBlock}>
          <section className={styles.textWrapper}>
            <h2 className={styles.stepTitle}>{chooseStepTitles[step]}</h2>
            <p className={makeStepDescriptionClassName(step)}>
              {chooseStepDescriptions[step]}
            </p>
          </section>
          <button
            type="button"
            disabled={isPrevDisabled}
            className={desktopBtnClassName}
            onClick={() => setStep((prevState) => --prevState)}
          >
            Назад
            <ArrowBackIcon/>
          </button>
        </aside>
        <div className={styles.divider}/>
        <div className={styles.formBlock}>
          {step === 1 && <ChooseTermStep
            currentTerm={term}
            terms={offer.terms}
            onChange={onChangeTerm}
          />}
          {step === 2 && <DepositStep
            deposit={deposit}
            onChange={onChangeDepositOption}
            setDefaultDeposit={setDefaultDeposit}
          />}
          {step === 3 && <PeriodStep
            range={[term.periodFrom, term.periodTo].slice(0, 2).map(Number)}
            onChange={onChangeRentalPeriod}
            unit={term.periodUnit}
            period={period}
          />}
          {step === 4 && <PaymentStep
            payment={payment}
            unit={term.periodUnit}
            onChangePaymentStart={onChangePaymentOption('paymentStartOptions')}
            onChangePaymentType={onChangePaymentOption('paymentTypeOptions')}
          />}
          {step === 5 && <CheckStep
            term={term}
            options={offer.options}
            payments={payment}
            address={offer.address}
            employer={employer}
            setEmployer={setEmployer}
            landlord={setEmployer}
            setLandlord={setLandlord}
          />
          }
          {step < 5 ? (
            <button
              type="button"
              disabled={isNextDisabled}
              onClick={() => setStep((prevState) => ++prevState)}
              className={`next-button ${styles.nextButton}`}
            >
              Далее
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={landlord.email.length === 0 || landlord.fullname.length === 0 || employer.fullname.length === 0 || employer.email.length === 0}
              type="submit"
              id={'create-contract'}
              className={styles.nextButton}
            >
              Отправить
            </button>
          )}

          <section className={styles.paginationDots}>
            {Object.keys(chooseStepTitles).map((item, index) => (
              <div
                key={index}
                className={clsx(styles.dotItem, {
                  [styles.dotItem__active]: index + 1 === step,
                  [styles.dotItem__past]: index < step,
                })}
              />
            ))}
          </section>
          <button
            type="button"
            disabled={isPrevDisabled}
            className={mobileBtnClassName}
            onClick={() => setStep((prevState) => --prevState)}
          >
            Назад
            <ArrowBackIcon/>
          </button>
        </div>
      </main>
    </>
  );
};
