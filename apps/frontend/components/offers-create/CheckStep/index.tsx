import React, {useMemo, useState} from 'react';
import clsx from 'clsx';

import styles from './CheckStep.module.scss';
import {MappingType, useMapping} from "../../../hooks/mapping.hook";
import {DurationAndPrice} from "../../common/preview/DurationAndPrice";
import {TerminationRules} from "../../common/preview/TerminationRules";
import {Options} from "../../common/preview/Options";
import {Payment} from "../../common/preview/Payment";

type Props = {
  terms: any[];
  options: any[];
  payments: any;
  form: any;
}

export const CheckStep = ({terms, options, payments, form}: Props) => {
  const variantsLabels = terms.map((_, i) => `${i + 1} вариант`);

  const propertyTypes = {
    ONE_ROOM: 'Однокомнатная квартира',
    TWO_ROOM: 'Двухкомнатная квартира',
    THREE_ROOM: 'Трехкомнатная квартира',
    FOUR_ROOM: 'Четырехкомнатная квартира',
    FIVE_ROOM: 'Пятикомнатная квартира',
    STUDIO: 'Студия',
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const term = terms[activeIndex]

  const handleClickVariantBtn = (index: number) => () => setActiveIndex(index);

  const variantItemClassName = (index: number) =>
    clsx(styles.item, {[styles.item_active]: index === activeIndex});


  const {
    address: {city, house, street, flat, cadastralNumber},
    meta: {propertyType: {value: propertyType}}
  } = form.getState().values


  const addressText = `г. ${city}, ${street}, дом ${house}, квартира ${flat}`
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

        <section className={styles.fieldsGroup_2col}>
          <h6 className={styles.fieldTitle}>Адрес жилья: </h6>
          <p className={styles.fieldText}>{addressText}</p>
        </section>
        <section className={styles.fieldsGroup_2col}>
          <h6 className={styles.fieldTitle}>Кадастровый номер: </h6>
          <p className={styles.fieldText}>{cadastralNumber}</p>
        </section>

        <section className={styles.fieldsGroup_2col}>
          <h6 className={styles.fieldTitle}>Тип жилья: </h6>
          <p className={styles.fieldText}>{propertyTypes[propertyType]}</p>
        </section>

      </div>
    </article>
  );
};
