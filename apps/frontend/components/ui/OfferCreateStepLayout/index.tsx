import React, { useState } from 'react';
import { useRouter } from 'next/router';

import clsx from 'clsx';
import axios from 'axios';
import { useForm } from 'react-final-form-hooks';

import { useTerms } from '../../../hooks/terms.hook';
import { usePayments } from '../../../hooks/payments.hook';
import { useOptions } from '../../../hooks/options.hook';

import { TermStep } from '../../offers-create/TermStep';
import { OptionStep } from '../../offers-create/OptionStep/';
import { PaymentStep } from '../../offers-create/PaymentStep/';
import { AddressStep } from '../../offers-create/AddressStep';
import { CheckStep } from '../../offers-create/CheckStep';
import { OfferPageHeader } from '../OfferPageHeader';

import { ArrowBackIcon } from '../../../public/images/svgIcons/ArrowBackIcon';

import { createStepDescriptions, createStepTitles } from '../constants';

import styles from './OfferStepLayout.module.scss';

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

export const OfferCreateStepLayout = () => {
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
              <h2 className={styles.stepTitle}>{createStepTitles[step]}</h2>
              <p className={makeStepDescriptionClassName(step)}>
                {createStepDescriptions[step]}
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
            {step === 1 && (
              <TermStep
                terms={terms}
                onAddTerm={onAddTerm}
                onChangeTerm={onChangeTerm}
                onAddTerminationRule={onAddTerminationRule}
                onDeleteTerminationRule={onDeleteTerminationRule}
                onDeleteTerm={onDeleteTerm}
              />
            )}
            {step === 2 && (
              <OptionStep
                options={options}
                onAddOption={onAddOption}
                onChangeOption={onChangeOption}
                onRemoveOption={onRemoveOption}
              />
            )}
            {step === 3 && (
              <PaymentStep
                payments={payments}
                onChangeStartOption={toggleStartOptions}
                onChangeTwoPaymentsCheckbox={toggleTwoPayments}
                onChangeTwoPaymentsPriceAffect={setTwoPaymentsPriceAffect}
              />
            )}
            {step === 4 && <AddressStep form={form} />}
            {step === 5 && <CheckStep
              terms={terms}

            />}
            {step < 5 ? (
              <button
                type="button"
                disabled={isNextDisabled}
                onClick={() => setStep((prevState) => ++prevState)}
                className={`next-step ${styles.nextButton}`}
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
              {Object.keys(createStepTitles).map((item, index) => (
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
