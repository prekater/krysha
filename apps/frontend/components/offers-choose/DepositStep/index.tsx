import React from 'react';

import styles from './DepositStep.module.scss';

export const DepositStep = ({deposit, onChange,setDefaultDeposit}) => {
  const depositTranslateMap = {
    ABSENT_WITH_EXTRA_CHARGE: `Без залога за дополнительные %s руб. к регулярному платежу`,
    PARTIAL:
      `Внесение  ${deposit.value} руб. двумя равными платежами. Первый платеж при заключении контракта. За дополнительные %s руб. к сумме регулярного платежа`,
  };

  return (
    <fieldset className={styles.root}>
      <legend className={styles.fieldTitle}>Залог:</legend>
      <section>
        {deposit.isEnabled && (
          <>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value={'CONCLUSION'}
                name={'deposit'}
                defaultChecked={deposit.collectOptions.every(co => !co.isEnabled )}
                onChange={setDefaultDeposit}
              />
              Внесение {deposit.value} руб. при заключении договора
              <span className={styles.radioCheckMark}/>
            </label>

            {deposit.collectOptions.map((o, i) => (
              <label key={i} className={styles.radioLabel}>
                <input
                  type="radio"
                  value={o.type}
                  checked={o.isEnabled}
                  name={'deposit'}
                  onChange={e => onChange(i, e)}
                />
                {depositTranslateMap[o.type].replace('%s', o.priceAffect)}
                <span className={styles.radioCheckMark}/>
              </label>
            ))}

          </>)}
        {!deposit.isEnabled && (
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value={'ABSENT'}
              name={'deposit'}
              defaultChecked={true}
              onChange={e => onChange(0, e)}
            />
            Отсутствует
            <span className={styles.radioCheckMark}/>
          </label>
        )}
      </section>
    </fieldset>
  );
};
