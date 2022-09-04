import React, {useMemo, useState} from 'react';
import clsx from 'clsx';

import styles from './CheckStep.module.scss';
import {MappingType, useMapping} from "../../../hooks/mapping.hook";

type Props = {
  terms: any[];
  options: any[];
  payments: any;
  form: any;
}

export const CheckStep = ({terms, options, payments, form}: Props) => {
  const variantsLabels = terms.map((_, i) => `${i + 1} вариант`);

  const psMap = {
    START_OF_MONTH: 'Первого числа каждого месяца',
    START_OF_RENT: 'По дате заключения договора',
  };
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
  const periodText = useMapping(MappingType.PERIOD, term.periodUnit)
  const currencyText = useMapping(MappingType.CURRENCY, term.priceUnit)

  const handleClickVariantBtn = (index: number) => () => setActiveIndex(index);

  const variantItemClassName = (index: number) =>
    clsx(styles.item, {[styles.item_active]: index === activeIndex});

  const enabledOptions = useMemo(() => {
    return options.filter(o => o.isEnabled)
  }, [options])
  const disabledOptions = useMemo(() => {
    return options.filter(o => !o.isEnabled)
  }, [options])

  const {
    address: {city, house, street, flat, cadastralNumber},
    meta: {propertyType: {value: propertyType}}
  } = form.getState().values

  const enabledPaymentStartOptions: any[] = useMemo(() => payments.paymentStartOptions
    .filter(({isEnabled}) => isEnabled), [payments])

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
        <section>
          <h6 className={styles.fieldTitle}>Срок</h6>
          <p className={styles.fieldText}>От {term.periodFrom} до {term.periodTo} {periodText.PLURAL} </p>
        </section>
        <section>
          <h6 className={styles.fieldTitle}>Стоимость</h6>
          <p
            className={styles.fieldText}>{new Intl.NumberFormat('de-DE').format(term.price)} {currencyText} в {periodText.SINGLE}</p>
        </section>
        <section className={styles.fieldsGroup_2col}>
          <h6 className={styles.fieldTitle}>Условия раннего расторжения</h6>
          <div className={styles.fieldText}>{term.terminationRules.length > 0 ?
            term.terminationRules.map(r => (
              <p>Если договор расторгнут по инициативе арендатора ранее, чем через {r.period} {periodText.PLURAL},
                регулярный платеж увеличится на {r.value} {currencyText}.</p>)) :
            'Отсутствуют'}</div>
        </section>
        <section className={styles.fieldsGroup_2col}>
          <h6 className={styles.fieldTitle}>Включено в стоимость: </h6>
          <div className={styles.fieldText}>{enabledOptions.map(
            o => (<p>{o.title}</p>)
          )}</div>
        </section>
        <section className={styles.fieldsGroup_2col}>
          <h6 className={styles.fieldTitle}>Не включено в стоимость: </h6>
          <div className={styles.fieldText}>{disabledOptions.map(
            o => (<p>{o.title}</p>)
          )}</div>
        </section>
        <section className={styles.fieldsGroup_2col}>
          <h6 className={styles.fieldTitle}>Ежемесячная оплата: </h6>
          <div className={styles.fieldText}>{
            enabledPaymentStartOptions.map(pso => (<p>{psMap[pso.type]}</p>))}</div>
        </section>
        <section className={styles.fieldsGroup_2col}>
          <h6 className={styles.fieldTitle}>Возможность разбить платежи: </h6>
          <p className={styles.fieldText}>{payments.paymentTypeOptions
            .find(({isEnabled, type}) => isEnabled && type === 'TWO_PAYMENTS') ? 'Да' : 'Нет'}</p>
        </section>
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
