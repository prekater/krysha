import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

import { TerminationRule } from './TerminationRule';
import { AddButton } from '../ui/AddButton';
import { DeleteButton } from '../ui/DeleteButton';
import { DropdownSelect } from '../ui/DropdownSelect';

import {
  periodOptions,
  defaultPeriodOption,
  currencyOptions,
  defaultCurrencyOption,
} from '../ui/constants';
import styles from './Term.module.scss';

type Props = {
  term: any;
  onChange: (field: string) => any;
  onAddTerminationRule: () => any;
  onDeleteTerminationRule: (ruleIndex: number) => any;
  onDelete: () => any;
};

const Term = (props: Props) => {
  const {
    term,
    onChange: onChangeTerm,
    onAddTerminationRule,
    onDeleteTerminationRule,
    onDelete,
  } = props;
  const termVariantsMock = ['1 вариант', '2 вариант'];
  const [activeItem, setActiveItem] = useState(
    termVariantsMock[Math.floor(Math.random() * 2)]
  );
  const termVariantClassName = (item: string) =>
    clsx(styles.termVariant, {
      [styles.termVariant_active]: item === activeItem,
    });
  const handleClickVariantBtn = (index: number) => () =>
    setActiveItem(termVariantsMock[index]);

  return (
    <article className={styles.root}>
      {/*<div>ID: {term.ID}</div>*/}
      <aside className={styles.termOptions}>
        {termVariantsMock.map((item, index) => (
          <div
            className={termVariantClassName(item)}
            key={index}
            onClick={handleClickVariantBtn(index)}
          >
            {item}
          </div>
        ))}
        {/*@TODO добавить ховер*/}
        <DeleteButton handleClick={onDelete} text="Удалить" />
      </aside>
      <fieldset className={styles.fieldsGroup} id="period-fields">
        <legend className={styles.fieldTitle}>Cрок:</legend>
        <div className={styles.periodFields}>
          <input
            value={term.periodFrom}
            className={styles.periodInput}
            name="period-fields"
            onChange={onChangeTerm('periodFrom')}
            type="number"
            placeholder="От"
          />
          <input
            value={term.periodTo}
            className={styles.periodInput}
            name="period-fields"
            onChange={onChangeTerm('periodTo')}
            type="number"
            placeholder="До"
          />
          <DropdownSelect
            options={periodOptions}
            defaultValue={defaultPeriodOption}
            handleChange={onChangeTerm('periodUnit')}
            customStyle={styles.periodDropdown}
          />
        </div>
      </fieldset>

      <fieldset className={styles.fieldsGroup} id="price-fields">
        <legend className={styles.fieldTitle}>Стоимость:</legend>
        <div className={styles.priceFields}>
          <section className={styles.priceChoice}>
            <label className={styles.priceLabel}>
              <input
                value={term.price}
                onChange={onChangeTerm('price')}
                className={styles.priceInput}
                name="price-fields"
                type="number"
                placeholder="50000"
              />
            </label>
            <DropdownSelect
              options={currencyOptions}
              defaultValue={defaultCurrencyOption}
              handleChange={onChangeTerm('priceUnit')}
            />
          </section>

          <div className={styles.depositRadioBtns}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="price-fields"
                value="true"
                onChange={onChangeTerm('deposit.isEnabled')}
                checked={term.deposit.isEnabled}
              />
              С залогом
              <span className={styles.radioCheckMark} />
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="price-fields"
                value="false"
                onChange={onChangeTerm('deposit.isEnabled')}
                checked={!term.deposit.isEnabled}
              />
              Без залога
              <span className={styles.radioCheckMark} />
            </label>
          </div>
        </div>
      </fieldset>

      {term.deposit.isEnabled && (
        <>
          <fieldset className={styles.fieldsGroup} id="deposit-sum-fields">
            <legend className={styles.fieldTitle}>Сумма залога:</legend>
            <section className={styles.depositSumFields}>
              <label className={styles.depositSumLabel}>
                <input
                  value={term.deposit.value}
                  onChange={onChangeTerm('deposit.value')}
                  className={styles.sumInput}
                  name="deposit-sum-fields"
                  type="number"
                  placeholder="50000"
                />
              </label>
              {/*@TODO в макете этого селекта тоже нет, добавить onChange*/}
              <DropdownSelect
                options={currencyOptions}
                defaultValue={defaultCurrencyOption}
                handleChange={onChangeTerm('priceUnit')}
              />
            </section>
          </fieldset>

          {/*@TODO здесь что-то со сменой значений чекбоксов*/}
          <fieldset className={styles.fieldsGroup} id="deposit-options">
            <legend className={styles.fieldTitle}>Опции залога:</legend>
            <section className={styles.depositOptionsGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="deposit-options"
                  checked={term.deposit.collectOptions[0].isEnabled}
                  onChange={onChangeTerm('deposit.collectOptions.0.isEnabled')}
                />
                Убрать залог за дополнительную плату
                <span className={styles.checkboxMark} />
              </label>
            </section>

            {term.deposit.collectOptions[0].isEnabled && (
              <label>
                <input
                  type="number"
                  value={term.deposit.collectOptions[0].priceAffect}
                  onChange={onChangeTerm(
                    'deposit.collectOptions.0.priceAffect'
                  )}
                  className={styles.sumOptionsInput}
                  placeholder="500000"
                />
                руб. в месяц
              </label>
            )}

            <section className={styles.depositOptionsGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="deposit-options"
                  checked={term.deposit.collectOptions[1].isEnabled}
                  onChange={onChangeTerm('deposit.collectOptions.1.isEnabled')}
                />
                Разбить залог на 2 месяца
                <span className={styles.checkboxMark} />
              </label>
            </section>
            {term.deposit.collectOptions[1].isEnabled && (
              <label>
                <input
                  type="number"
                  value={term.deposit.collectOptions[1].priceAffect}
                  onChange={onChangeTerm(
                    'deposit.collectOptions.1.priceAffect'
                  )}
                  className={styles.sumOptionsInput}
                  placeholder="500000"
                />
                руб. в месяц
              </label>
            )}
          </fieldset>
        </>
      )}

      <fieldset className={styles.fieldsGroup} id="return-type">
        <legend className={styles.fieldTitle}>
          Условия раннего расторжения:
        </legend>
        <div className={styles.returnTypeRadioBtns}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="return-type"
              value="RECALCULATE_PRICE"
              onChange={onChangeTerm('deposit.returnType')}
              checked={term.deposit.returnType === 'RECALCULATE_PRICE'}
            />
            Пересчет арендной ставки
            <span className={styles.radioCheckMark} />
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="return-type"
              value="FULLY_WITHHELD_UPON_CONTRACT_TERMINATION"
              onChange={onChangeTerm('deposit.returnType')}
            />
            Залог удерживается в случае досрочного выезда
            <span className={styles.radioCheckMark} />
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="return-type"
              value="REFOUND_IN_CASE_OF_1_MONTH_NOTICE"
              onChange={onChangeTerm('deposit.returnType')}
            />
            Залог возвращается при предупреждении о выезде за 30 дней
            <span className={styles.radioCheckMark} />
          </label>
        </div>
      </fieldset>

      {term.deposit.returnType === 'RECALCULATE_PRICE' && (
        <fieldset className={styles.fieldsGroup} id="recalculate-price">
          <legend className={styles.fieldTitle}>
            Коррекция стоимости при досрочном расторжении договора:
          </legend>
          {term.terminationRules.map((rule, ruleIndex, id) => (
            <TerminationRule
              rule={rule}
              onChangeTerm={onChangeTerm}
              ruleIndex={ruleIndex}
              onDelete={onDeleteTerminationRule(ruleIndex)}
              key={ruleIndex}
            />
          ))}
          <AddButton
            handleClick={onAddTerminationRule}
            text="Добавить опцию"
            customTextStyle={styles.addRuleButton}
          />
        </fieldset>
      )}

      <AddButton
        handleClick={() => console.log('add term')}
        text="Добавить вариант аренды"
        customTextStyle={styles.addTermButton}
      />
    </article>
  );
};

export default dynamic(() => Promise.resolve(Term), {
  ssr: false,
});
