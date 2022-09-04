import React, {useEffect, useState} from 'react';
import clsx from 'clsx';

import { defaultMonthsOption, monthsOptions } from '../../ui/constants';
import { DropdownSelect } from '../../ui/DropdownSelect';
import CalendarBlock from '../../ui/Calendar';
import styles from './PeriodStep.module.scss';
import {MappingType, useMapping} from "../../../hooks/mapping.hook";
import {reverseDate} from "../../../utils";

export const PeriodStep = ({ period, unit, range, onChange }) => {
  const [duration, setDuration] = useState(range[0]);
  const periodText = useMapping(MappingType.PERIOD, unit)

  const onChangeStart = (date: string) => {
    onChange('startDate')(date);
  };
  const onChangeEnd = (value: number) => {

    const splittedDate = period.startDate.split('.').reverse()
    splittedDate[1] = splittedDate[1] - 1
    // @ts-ignore
    const date = new Date( ...splittedDate)

    let endDate;
    switch (unit) {
      case 'days':
        endDate = new Date(date.setDate(date.getDate() + value));
        break;
      case 'months':
        endDate = new Date(date.setMonth(date.getMonth() + value));
        break;
      case 'years':
        endDate = new Date(date.setFullYear(date.getFullYear() + value));
        break;
    }
    if ( endDate.toString() !== 'Invalid Date') onChange('endDate')(new Intl.DateTimeFormat().format(endDate));
  };
  useEffect(() => {
    onChangeEnd(duration);
  }, [duration]);

  useEffect(() => {
    onChangeEnd(duration);
  }, [period.startDate]);

  const options = Array.from({ length: range[1] }, (_, i) => i + 1)
    .slice(range[0] - 1)
    .map((o) => ({label: o.toString(), value: o.toString()}) )

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const handleOpenCalendar = () => setIsOpenCalendar(!isOpenCalendar);
  const handleCloseCalendar = () => setIsOpenCalendar(false);

  const handleChangeDate = (year, month, day) =>
    onChangeStart(new Intl.DateTimeFormat().format(new Date(year, month, day)));

  const makePeriodInputClassName = clsx(styles.periodInput, {
    [styles.periodInput__opened]: isOpenCalendar,
  });

  return (
    <article className={styles.root}>
      <fieldset className={styles.fieldsGroup} id="period-fields">
        <legend className={styles.fieldTitle}>Дата начала аренды:</legend>
        <div className={makePeriodInputClassName} onClick={handleOpenCalendar}>
          <span className={styles.periodInputText}>
            {period.startDate || 'Выберите дату'}
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
          На какое количество {periodText.PLURAL} заключим договор?
        </legend>
        <section className={styles.monthInputBlock}>
          <DropdownSelect
            name={'days-count'}
            options={options}
            defaultValue={options[0].value}
            handleChange={(e) => {
              setDuration(Number(e))
            }}
            customStyle={styles.monthDropdown}
          />
          <span className={styles.monthInputText}>
            Расторжение договора ранее {duration} {periodText.PLURAL} будет считаться ранним
          </span>
        </section>
      </fieldset>
    </article>
  );
};
