import React from 'react';

import { DeleteButton } from '../ui/DeleteButton';
import { DropdownSelect } from '../ui/DropdownSelect';
import {
  periodOptions,
  defaultPeriodOption,
  currencyOptions,
  defaultCurrencyOption,
} from '../ui/constants';

import styles from './TerminationRule.module.scss';

type Props = {
  rule: any;
  ruleIndex: number;
  onChangeTerm: (field: string) => any;
  onDelete: () => any;
};

export const TerminationRule = (props: Props) => {
  const { rule, onChangeTerm, ruleIndex, onDelete } = props;

  return (
    <section className={styles.root}>
      <span className={styles.ruleText}>
        Если договор расторгнут по
        <br /> инициативе арендатора ранее, чем{' '}
      </span>
      <div className={styles.periodsInputsGroup}>
        <label className={styles.priceLabel}>
          <input
            value={rule.period}
            onChange={onChangeTerm(`terminationRules.${ruleIndex}.period`)}
            className={styles.periodInput}
            name="price-fields"
            type="number"
            placeholder="6"
          />
        </label>
        <DropdownSelect
          options={periodOptions}
          defaultValue={defaultPeriodOption}
          handleChange={onChangeTerm(`terminationRules.${ruleIndex}.value`)}
          customStyle={styles.periodDropdown}
        />
      </div>

      <span className={styles.ruleText}>
        стоимость ежемесячной аренды изменится на
      </span>

      <div className={styles.periodsInputsGroup}>
        <label className={styles.priceLabel}>
          <input
            value={rule.value}
            onChange={onChangeTerm(`terminationRules.${ruleIndex}.value`)}
            className={styles.periodInput}
            name="price-fields"
            type="number"
            placeholder="50000"
          />
        </label>
        <DropdownSelect
          options={currencyOptions}
          defaultValue={defaultCurrencyOption}
          handleChange={onChangeTerm(`terminationRules.${ruleIndex}.currency`)}
        />
      </div>
      <DeleteButton handleClick={onDelete} text="Удалить" />
    </section>
  );
};
