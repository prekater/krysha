import React, { useState } from 'react';
import { useRouter } from 'next/router';

import clsx from 'clsx';
import axios from 'axios';
import { useForm } from 'react-final-form-hooks';

import { useTerms } from '../../../hooks/terms.hook';
import { usePayments } from '../../../hooks/payments.hook';
import { useOptions } from '../../../hooks/options.hook';
import { ChooseOfferStep } from '../../offers-choose/ChooseOfferStep';
import { DepositStep } from '../../offers-choose/DepositStep';
import { OfferPageHeader } from '../OfferPageHeader';

import { ArrowBackIcon } from '../../../public/images/svgIcons/ArrowBackIcon';

import { chooseStepTitles, chooseStepDescriptions } from '../constants';

import styles from './OfferChooseCtepLayout.module.scss';
import { PeriodStep } from '../../offers-choose/PeriodStep';
import { PaymentStep } from '../../offers-choose/PaymentsStep';
import { CheckStep } from '../../offers-choose/CheckStep';

const validate = (values) => {
  const errors: any = {};
  // if (!values.firstName) {
  //   errors.firstName = 'Required'
  // }
  // if (!values.lastName) {
  //   errors.lastName = 'Required'
  // }
  return errors;
};

export const OfferChooseStepLayout = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [isPrevDisabled, isNextDisabled] = [step === 1, step === 5];

  // terms block
  const {
    terms,
    onAddTerm,
    onChangeTerm: oCT,
    onAddTerminationRule: oATR,
    onDeleteTerminationRule,
    onDeleteTerm,
  } = useTerms();

  const {
    payments,
    toggleTwoPayments,
    setTwoPaymentsPriceAffect,
    toggleStartOptions,
  } = usePayments();

  // options block
  const { options, onChangeOption, onAddOption, onRemoveOption } = useOptions();

  const onChangeTerm = (index) => (field) => oCT(index, field);
  const onAddTerminationRule = (index) => oATR(index);

  const removeUnnecessaryTerminationRules = (t) => {
    if (t.deposit.returnType !== 'RECALCULATE_PRICE') {
      return { ...t, terminationRules: [] };
    }
    return t;
  };
  const onSubmit = async (values) => {
    const payload = {
      ...values,
      options,
      terms: terms.map(removeUnnecessaryTerminationRules),
      authorId: 'weofkwpfokw',
      payment: payments,
    };
    const { data } = await axios.post(
      `http://ec2-44-200-125-244.compute-1.amazonaws.com:3333/api/offers`,
      payload
    );

    router.push(
      `http://ec2-44-200-125-244.compute-1.amazonaws.com:3000/offers/${data.resourceId}`
    );
  };

  const { form, handleSubmit, values } = useForm({
    onSubmit,
    validate,
  });

  const desktopBtnClassName = clsx(styles.backBtn, [styles.backBtn__web]);
  const mobileBtnClassName = clsx(styles.backBtn, [styles.backBtn__mobile]);

  const makeStepDescriptionClassName = (step: number) =>
    clsx(styles.stepDescription, styles[`stepDescription_step${step}`]);

  return (
    <>
      <OfferPageHeader step={step} />
      <form onSubmit={handleSubmit}>
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
              <ArrowBackIcon />
            </button>
          </aside>
          <div className={styles.divider} />
          <div className={styles.formBlock}>
            {step === 1 && <ChooseOfferStep />}
            {step === 2 && <DepositStep />}
            {step === 3 && <PeriodStep />}
            {step === 4 && <PaymentStep />}
            {step === 5 && <CheckStep />}
            {step < 5 ? (
              <button
                type="button"
                disabled={isNextDisabled}
                onClick={() => setStep((prevState) => ++prevState)}
                className={styles.nextButton}
              >
                Далее
              </button>
            ) : (
              <button
                type="submit"
                disabled={false}
                onClick={() => console.log('the form  was submit')}
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
              <ArrowBackIcon />
            </button>
          </div>
        </main>
      </form>
    </>
  );
};
