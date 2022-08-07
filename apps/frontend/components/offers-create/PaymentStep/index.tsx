import React from 'react';

import clsx from 'clsx';

import styles from './PaymentStep.module.scss';

type Props = {
  payments: any;
  onChangeStartOption: any;
  onChangeTwoPaymentsCheckbox: any;
  onChangeTwoPaymentsPriceAffect: any;
};

export const PaymentStep = ({
  payments,
  onChangeTwoPaymentsCheckbox,
  onChangeTwoPaymentsPriceAffect,
  onChangeStartOption,
}: Props) => {
  const psMap = {
    START_OF_MONTH: 'Первого числа каждого месяца',
    START_OF_RENT: 'По дате заключения договора',
  };

  const longTextCheckmarkClassName = clsx(
    styles.checkboxMark,
    styles.checkboxMark__long
  );
  const longTextLabelClassName = clsx(
    styles.checkboxLabel,
    styles.checkboxLabel__long
  );

  return (
    <article className={styles.root}>
      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>Ежемесячная оплата</legend>
        {payments.paymentStartOptions.map((pso, i) => (
          <label className={styles.checkboxLabel} key={i}>
            <input
              type="checkbox"
              checked={pso.isEnabled}
              onChange={(e) => onChangeStartOption(i, e)}
            />
            {psMap[pso.type]}
            <span className={styles.checkboxMark} />
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>
          Возможность разбить платежи
        </legend>
        <label className={longTextLabelClassName}>
          <input
            type="checkbox"
            checked={payments.paymentTypeOptions[0].isEnabled}
            onChange={onChangeTwoPaymentsCheckbox}
          />
          Возможность внесения аренды несколькими платежами в течение 15 дней
          оплачиваемого месяца
          <span className={longTextCheckmarkClassName} />
        </label>
        <label className={styles.sumOptionsLabel}>
          <input
            type="number"
            disabled={!payments.paymentTypeOptions[0].isEnabled}
            value={payments.paymentTypeOptions[0].priceAffect}
            onChange={onChangeTwoPaymentsPriceAffect}
            className={styles.sumOptionsInput}
            placeholder="2000"
          />
          руб. в месяц дополнительно
        </label>
      </fieldset>
    </article>
  );
};
