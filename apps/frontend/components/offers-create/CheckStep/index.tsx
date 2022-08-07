import React, { useState } from 'react';
import clsx from 'clsx';

import styles from './CheckStep.module.scss';

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

const variantsMock = ['1 вариант', '2 вариант', '3 вариант'];

export const CheckStep = () => {
  const makeFieldClassName = (index: number) =>
    clsx(styles.fieldsGroup, { [styles.fieldsGroup_2col]: index > 1 });
  const [activeItem, setActiveItem] = useState(
    variantsMock[Math.floor(Math.random() * 3)]
  );
  const variantItemClassName = (item: string) =>
    clsx(styles.item, { [styles.item_active]: item === activeItem });
  const handleClickVariantBtn = (index: number) => () =>
    setActiveItem(variantsMock[index]);

  return (
    <article className={styles.root}>
      <nav className={styles.variants}>
        {variantsMock.map((item, index) => (
          <span
            key={index}
            className={variantItemClassName(item)}
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
      </div>
    </article>
  );
};
