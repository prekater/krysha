import React, { useState } from 'react';

import styles from './PaymentsStep.module.scss';

export const PaymentStep = () => {
  const [paymentsValue, setPaymentsValue] = useState({
    paymentStart: 'firstDay',
    paymentDivide: 'divide',
  });

  const handleChange = (e) => {
    setPaymentsValue({
      ...paymentsValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <article className={styles.root}>
      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>Начало оплаты</legend>
        <section>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="firstDay"
              onChange={handleChange}
              name="paymentStart"
              checked={paymentsValue.paymentStart === 'firstDay'}
            />
            Первого числа каждого месяца
            <span className={styles.radioCheckMark} />
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="inDay"
              onChange={handleChange}
              name="paymentStart"
              checked={paymentsValue.paymentStart === 'inDay'}
            />
            В день заключения договора
            <span className={styles.radioCheckMark} />
          </label>
        </section>
      </fieldset>

      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>Тип оплаты</legend>
        <section>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="paymentDivide"
              value="divide"
              onChange={handleChange}
              checked={paymentsValue.paymentDivide === 'divide'}
            />
            <span className={styles.extraPadding}>
              Разбить на два платежа за дополнительные 500 руб. к сумме аренды
            </span>
            <span className={styles.radioCheckMark} />
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="paymentDivide"
              value="notDivide"
              onChange={handleChange}
              checked={paymentsValue.paymentDivide === 'notDivide'}
            />
            Одним платежом
            <span className={styles.radioCheckMark} />
          </label>
        </section>
      </fieldset>
    </article>
  );
};
