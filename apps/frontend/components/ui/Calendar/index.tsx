import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './Calendar.module.scss';
import clsx from 'clsx';

interface IProps {
  handleUpdate: (year: number, month: number, day: number) => void;
  onCloseCalendar?: () => void;
}

const CalendarBlock = ({
  handleUpdate,
  onCloseCalendar,
}: IProps): JSX.Element => {
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const today = new Date();

  const [fullDate, setDate] = useState(new Date(today));

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(fullDate.getFullYear()) ? DAYS_LEAP : DAYS;
  const [day, setDay] = useState(fullDate.getDate());
  const [month, setMonth] = useState(fullDate.getMonth());
  const [year, setYear] = useState(fullDate.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(fullDate));
  const [endDay, setEndDay] = useState(getEndDayOfMonth(fullDate));

  useEffect(() => {
    setDay(fullDate.getDate());
    setMonth(fullDate.getMonth());
    setYear(fullDate.getFullYear());
    setStartDay(getStartDayOfMonth(fullDate));
    setEndDay(getEndDayOfMonth(fullDate));
  }, [fullDate]);

  function getStartDayOfMonth(date: Date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDate === 0 ? 7 : startDate;
  }

  const currentMonth: boolean = month === today.getMonth();
  const currentYear: boolean = year === today.getFullYear();
  const pastMonth: boolean = month < today.getMonth();
  const pastYear: boolean = year < today.getFullYear();
  const maxWeekDays = 7;

  function getEndDayOfMonth(date: Date) {
    const endDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      days[date.getMonth()]
    ).getDay();
    return endDate === 0 ? maxWeekDays : endDate;
  }

  const handlePrevBtnClick = () => () =>
    setDate(new Date(year, month - 1, day));

  const handleNextBtnClick = () => () =>
    setDate(new Date(year, month + 1, day));

  const handleChangeDate = (currentDay) => {
    const isActual =
      year > today.getFullYear() ||
      month > today.getMonth() ||
      (year === today.getFullYear() &&
        month === today.getMonth() &&
        currentDay >= today.getDate());
    if (isActual) {
      onCloseCalendar();
      handleUpdate(year, month, currentDay);
    }
  };

  const makeDayClassName = (currentDay) =>
    clsx(styles.day, {
      [styles.day__isPastDay]:
        pastYear ||
        ((pastYear || currentYear) && pastMonth) ||
        (currentMonth && currentYear && currentDay < today.getDate()),
      [styles.day__isSelected]: currentDay === day,
    });

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button
          className={clsx(styles.navBtn, styles.navBtn__isPrev)}
          onClick={handlePrevBtnClick()}
          type="button"
        />
        <span>
          {MONTHS[month]} {year}
        </span>
        <button
          className={styles.navBtn}
          onClick={handleNextBtnClick()}
          type="button"
        />
      </header>
      <section className={styles.body}>
        <div className={styles.daysNamesWrapper}>
          {DAYS_OF_THE_WEEK.map((d) => (
            <div className={styles.dayName} key={d}>
              {d}
            </div>
          ))}
        </div>
        <section className={styles.daysWrapper}>
          {Array(days[month] + (startDay - 1) + (7 - endDay))
            .fill(null)
            .map((_, index) => {
              const currentDay = index - (startDay - 2);
              return (
                <div
                  className={makeDayClassName(currentDay)}
                  key={index}
                  onClick={() => handleChangeDate(currentDay)}
                >
                  {currentDay <= 0
                    ? month === 0
                      ? `${days[11] + (index - startDay + 2)}`
                      : `${days[month - 1] + (index - startDay + 2)}`
                    : currentDay <= days[month]
                    ? currentDay
                    : currentDay - days[month]}
                </div>
              );
            })}
        </section>
      </section>
    </div>
  );
};

export default CalendarBlock;
