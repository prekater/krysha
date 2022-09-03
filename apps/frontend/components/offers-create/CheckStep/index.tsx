import React, {useState} from 'react';
import clsx from 'clsx';

import styles from './CheckStep.module.scss';
import {MappingType, useMapping} from "../../../hooks/mapping.hook";

const offerMock = [
  {
    title: 'Срок',
    value: 'От 3 до 11 месяцев',
  },
  {
    title: 'Стоимость',
    value: '50.000 руб. в месяц',
  },
  {
    title: 'Условия раннего расторже`ния',
    value: 'Пересчёт арендной ставки',
  },
  {
    title: 'Корректировка при расторжении',
    value:
      'Если договор расторгнут по инициативе арендатора ранее, чем через 6 месяцев, стоимость ежемесячной аренды увеличится на 5000 руб.',
  },
  {
    title: 'Включено в стоимость аренды',
    value: 'Уборка и замена постельного белья',
  },
  {
    title: 'Не включено в стоимость аренды',
    value: ['Wi-Fi', 'Телевидение'],
  },
  {
    title: 'Ежемесячная оплата',
    value: 'Первого числа каждого месяца',
  },
  {
    title: 'Возможность разбить платежи',
    value: 'Нет',
  },
  {
    title: 'Адрес жилья',
    value: 'Москва, ул. Марксистская, д. 5, кв. 87',
  },
  {
    title: 'Тип жилья',
    value: 'Трёхкомнатная квартира',
  },
];

type Props = {
  terms: any;
}
export const CheckStep = ({terms}: Props) => {
  const variantsLabels = terms.map((_, i) => `${i + 1} вариант`);

  const [activeIndex, setActiveIndex] = useState(0);

  const term = terms[activeIndex]
  const periodText = useMapping(MappingType.PERIOD, term.periodUnit.value)
  const currencyText = useMapping(MappingType.CURRENCY, term.priceUnit.value)
  const makeFieldClassName = (index: number) =>
    clsx(styles.fieldsGroup, { [styles.fieldsGroup_2col]: index > 1 });
  const handleClickVariantBtn = (index: number) => () => setActiveIndex(index);

  const variantItemClassName = (index: number) =>
    clsx(styles.item, { [styles.item_active]: index === activeIndex });


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
        {offerMock.map((item, index) => (
          <section className={makeFieldClassName(index)} key={index}>
            <h6 className={styles.fieldTitle}>{item.title}</h6>
            <p className={styles.fieldText}>{item.value}</p>
          </section>
        ))}


          <section>
            <h6 className={styles.fieldTitle}>Срок</h6>
            <p className={styles.fieldText}>От {term.periodFrom} до {term.periodTo} {periodText.PLURAL} </p>
          </section>
        <section>
            <h6 className={styles.fieldTitle}>Стоимость</h6>
            <p className={styles.fieldText}>{term.price} {currencyText}</p>
          </section>
        <section>
            <h6 className={styles.fieldTitle}>Test</h6>
            <p className={styles.fieldText}>Value</p>
          </section>
      </div>
    </article>
  );
};
