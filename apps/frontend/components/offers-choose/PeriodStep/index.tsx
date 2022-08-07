import React, { useState } from 'react';
import clsx from 'clsx';

import { defaultMonthsOption, monthsOptions } from '../../ui/constants';
import { DropdownSelect } from '../../ui/DropdownSelect';
import CalendarBlock from '../../ui/Calendar';
import styles from './PeriodStep.module.scss';

export const PeriodStep = () => {
  const onChangeMonth = () => () => console.log('onChangeMonth');
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [date, setDate] = useState('');
  const handleOpenCalendar = () => setIsOpenCalendar(!isOpenCalendar);

  const handleCloseCalendar = () => setIsOpenCalendar(false);

  const handleChangeDate = (year, month, day) =>
    setDate(new Intl.DateTimeFormat().format(new Date(year, month, day)));

  const makePeriodInputClassName = clsx(styles.periodInput, {
    [styles.periodInput__opened]: isOpenCalendar,
  });

  return (
    <article className={styles.root}>
      <fieldset className={styles.fieldsGroup} id="period-fields">
        <legend className={styles.fieldTitle}>Дата начала аренды:</legend>
        <div className={makePeriodInputClassName} onClick={handleOpenCalendar}>
          <span className={styles.periodInputText}>
            {date || 'Выберите дату'}
          </span>
          <img
            width={18}
            height={20}
            src="/images/calendar.svg"
            alt="calendar"
          />
        </div>
        {isOpenCalendar && (
          <CalendarBlock
            handleUpdate={handleChangeDate}
            onCloseCalendar={handleCloseCalendar}
          />
        )}
      </fieldset>

      <fieldset className={styles.fieldsGroup} id="period-fields">
        <legend className={styles.fieldTitle}>
          На какое количество месяцев заключим договор?
        </legend>
        <section className={styles.monthInputBlock}>
          <DropdownSelect
            options={monthsOptions}
            defaultValue={defaultMonthsOption}
            handleChange={onChangeMonth()}
            customStyle={styles.monthDropdown}
          />
          <span className={styles.monthInputText}>
            Расторжение договора ранее трёх месяцев будет считаться ранним
          </span>
        </section>
      </fieldset>
    </article>
  );
};
