import React, {useState} from 'react';
import clsx from 'clsx';

import styles from './ChooseOfferStep.module.scss';
import {DurationAndPrice} from "../../common/preview/DurationAndPrice";
import {TerminationRules} from "../../common/preview/TerminationRules";
import {Options} from "../../common/preview/Options";


export const ChooseTermStep = ({currentTerm, terms, onChange}) => {

  return (
    <article className={styles.root}>
      {terms.map((term, index) => (
        <div key={index} className={styles.variantBlock}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              onClick={() => onChange(term.ID)}
              name="term-picker"
              value="true"
              checked={term.ID === currentTerm.ID}
            />
            {`${index + 1} вариант`}
            <span className={styles.radioCheckMark}/>
          </label>
          <div className={styles.fieldsBlock}>
            <DurationAndPrice
              periodFrom={term.periodFrom}
              periodTo={term.periodTo}
              price={term.price}
              priceUnit={term.priceUnit}
              periodUnit={term.periodUnit}
            />
            <TerminationRules
              terminationRules={term.terminationRules.map(({props}) => props)}
              priceUnit={term.priceUnit}
              periodUnit={term.periodUnit}
            />
          </div>
        </div>
      ))}
    </article>
  );
};
