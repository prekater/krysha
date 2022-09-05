import React, {useState} from 'react';

import styles from './PaymentsStep.module.scss';
import {MappingType, useMapping} from "../../../hooks/mapping.hook";

export const PaymentStep = ({payment, unit, onChangePaymentStart, onChangePaymentType}) => {
  const periodText = useMapping(MappingType.PERIOD, unit)

  const psMap = {
    START_OF_MONTH: 'Оплата первого числа каждого месяца',
    START_OF_RENT:
      'Оплата в день заключения договора, если договор начинается не с первого числа месяца',
  };
  const ptMap = {
    ONE_PAYMENT: 'Одним платежом',
    TWO_PAYMENTS: `Разбить на два платежа за дополнительные %s руб. в ${periodText.SINGLE} к сумме аренды`,
  };

  return (
    <article className={styles.root}>
      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>Начало оплаты</legend>
        <section>
          {payment.paymentStartOptions.map((pso, i) => {
            return (
              <label key={i} className={styles.radioLabel}>
                <input
                  type="radio"
                  value={pso.type}
                  onChange={(e) => onChangePaymentStart(i, e)}
                  name="paymentStart"
                  checked={pso.isEnabled}
                />
                {psMap[pso.type]}
                <span className={styles.radioCheckMark}/>
              </label>
            )
          })}
        </section>
      </fieldset>

      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>Тип оплаты</legend>
        <section>
          {payment.paymentTypeOptions.map((pto, i) => (
            <label key={i} className={styles.radioLabel}>
              <input
                type="radio"
                name="paymentDivide"
                value={pto.type}
                onChange={(e) => onChangePaymentType(i, e)}
                checked={pto.isEnabled}
              />
              <span className={styles.extraPadding}>{ptMap[pto.type].replace('%s', pto.priceAffect)}</span>
              <span className={styles.radioCheckMark}/>
            </label>
          ))}
        </section>
      </fieldset>
    </article>
  );
};
