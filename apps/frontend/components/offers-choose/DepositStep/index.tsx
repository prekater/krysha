import React, { useState } from 'react';

import styles from './DepositStep.module.scss';

export const DepositStep = () => {
  const [values, setValues] = useState('3000');
  const handleChange = (e) => setValues(e.target.value);
  return (
    <fieldset className={styles.root}>
      <legend className={styles.fieldTitle}>Залог:</legend>
      <section>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="3000"
            onChange={handleChange}
            name="3000"
            checked={values === '3000'}
          />
          Внесение 30000 руб. при заключении договора
          <span className={styles.radioCheckMark} />
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="1500"
            onChange={handleChange}
            name="1500"
            checked={values === '1500'}
          />
          Без залога за дополнительные 1500 руб. в месяц к аренде
          <span className={styles.radioCheckMark} />
        </label>
      </section>
    </fieldset>
  );
};
