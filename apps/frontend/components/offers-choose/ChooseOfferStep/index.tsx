import React from 'react';
import clsx from 'clsx';

import styles from './ChooseOfferStep.module.scss';

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
    title: 'Условия раннего расторжения',
    value: 'Пересчёт арендной ставки',
  },
  {
    title: 'Корректировка при расторжении',
    value:
      'Если договор расторгнут по инициативе арендатора ранее, чем через 6 месяцев, стоимость ежемесячной аренды увеличится на 5000 руб.',
  },
];

const variantsMock = ['1 вариант', '2 вариант', '3 вариант'];

export const ChooseOfferStep = () => {
  const makeFieldClassName = (index: number) =>
    clsx(styles.fieldsGroup, { [styles.fieldsGroup_2col]: index > 1 });

  return (
    <article className={styles.root}>
      {variantsMock.map((item, index) => (
        <div key={index} className={styles.variantBlock}>
          <label className={styles.radioLabel}>
            <input type="radio" name="price-fields" value="true" />
            {item}
            <span className={styles.radioCheckMark} />
          </label>
          <div className={styles.fieldsBlock}>
            {offerMock.map((item, index) => (
              <section className={makeFieldClassName(index)} key={index}>
                <h6 className={styles.fieldTitle}>{item.title}</h6>
                <p className={styles.fieldText}>{item.value}</p>
              </section>
            ))}
          </div>
        </div>
      ))}
    </article>
  );
};
