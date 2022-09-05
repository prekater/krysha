import React, {useMemo, useState} from 'react';
import clsx from 'clsx';

import styles from './CheckStep.module.scss';
import {MappingType, useMapping} from "../../../hooks/mapping.hook";
import {DurationAndPrice} from "../../common/preview/DurationAndPrice";
import {TerminationRules} from "../../common/preview/TerminationRules";
import {Options} from "../../common/preview/Options";
import {Payment} from "../../common/preview/Payment";
import Address from "../../common/preview/Address";

type Props = {
  terms: any[];
  options: any[];
  payments: any;
  form: any;
}

export const CheckStep = ({terms, options, payments, form}: Props) => {
  const variantsLabels = terms.map((_, i) => `${i + 1} вариант`);

  const [activeIndex, setActiveIndex] = useState(0);

  const term = terms[activeIndex]

  const handleClickVariantBtn = (index: number) => () => setActiveIndex(index);

  const variantItemClassName = (index: number) =>
    clsx(styles.item, {[styles.item_active]: index === activeIndex});


  const {address, meta} = form.getState().values


  return (
    <article className={styles.root}>
      <nav className={styles.variants}>
        {variantsLabels.map((item, index) => (
          <span
            key={index}
            className={variantItemClassName(index)}
            onClick={handleClickVariantBtn(index)}
          >
            {item}
          </span>
        ))}
      </nav>
      <div className={styles.fieldsBlock}>
        <DurationAndPrice
          periodFrom={term.periodFrom}
          periodTo={term.periodTo}
          price={term.price}
          priceUnit={term.priceUnit}
          periodUnit={term.periodUnit}
        />
        <TerminationRules
          terminationRules={term.terminationRules}
          priceUnit={term.priceUnit}
          periodUnit={term.periodUnit}
        />
        <Options options={options}/>
        <Payment data={payments}/>
        <Address address={address}/>
      </div>
    </article>
  );
};
