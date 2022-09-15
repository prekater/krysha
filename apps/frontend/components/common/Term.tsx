import React from 'react';
import dynamic from 'next/dynamic';
import {TerminationRule} from './TerminationRule';
import {AddButton} from '../ui/AddButton';
import {DropdownSelect} from '../ui/DropdownSelect';

import {currencyOptions, defaultCurrencyOption, defaultPeriodOption, periodOptions,} from '../ui/constants';
import styles from './Term.module.scss';
import {MappingType, PluralType, useMapping} from "../../hooks/mapping.hook";

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
  } = props;
  const periodText = useMapping(MappingType.PERIOD, term.periodUnit)

  return (
    <article className={styles.root}>
      <fieldset className={styles.fieldsGroup} id="period-fields">
        <legend className={styles.fieldTitle}>Cрок:</legend>
        <div className={styles.periodFields}>
          <input
            value={term.periodFrom}
            className={styles.periodInput}
            name="periodFrom"
            onChange={onChangeTerm('periodFrom')}
            type="number"
            placeholder="От"
          />
          <input
            value={term.periodTo}
            className={styles.periodInput}
            name="periodTo"
            onChange={onChangeTerm('periodTo')}
            type="number"
            placeholder="До"
          />
          <DropdownSelect
            name={'period-unit'}
            options={periodOptions}
            defaultValue={term.periodUnit.value}
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
                name="price"
                type="number"
                placeholder="50000"
              />
            </label>
            <DropdownSelect
              name={'price-currency'}
              options={currencyOptions}
              defaultValue={term.priceUnit.value}
              handleChange={onChangeTerm('priceUnit')}
            />
          </section>

          <div className={styles.depositRadioBtns}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="deposit-checkbox"
                value="true"
                onChange={onChangeTerm('deposit.isEnabled')}
                checked={term.deposit.isEnabled}
              />
              С залогом
              <span className={styles.radioCheckMark}/>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="deposit-checkbox"
                value="false"
                onChange={onChangeTerm('deposit.isEnabled')}
                checked={!term.deposit.isEnabled}
              />
              Без залога
              <span className={styles.radioCheckMark}/>
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
                  name="deposit-sum"
                  type="number"
                  placeholder="50000"
                />
              </label>
            </section>
          </fieldset>

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
                <span className={styles.checkboxMark}/>
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
                  className={`priceAffect ${styles.sumOptionsInput}`}
                  placeholder="500000"
                />
                руб. в {periodText[PluralType.SINGLE]}
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
                Разбить залог на 2 {periodText[PluralType.PLURAL]}
                <span className={styles.checkboxMark}/>
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
                  className={`priceAffect ${styles.sumOptionsInput}`}
                  placeholder="500000"
                />
                руб. в {periodText[PluralType.SINGLE]}
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
            <span className={styles.radioCheckMark}/>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="return-type"
              value="FULLY_WITHHELD_UPON_CONTRACT_TERMINATION"
              onChange={onChangeTerm('deposit.returnType')}
            />
            Залог удерживается в случае досрочного выезда
            <span className={styles.radioCheckMark}/>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="return-type"
              value="NO_WITHHELD"
              onChange={onChangeTerm('deposit.returnType')}
            />
            Не удерживается
            <span className={styles.radioCheckMark}/>
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
            id={'add-termination-rule-btn'}
            handleClick={onAddTerminationRule}
            text="Добавить правило расторжения"
            customTextStyle={styles.addRuleButton}
          />
        </fieldset>
      )}
    </article>
  );
};

export default dynamic(() => Promise.resolve(Term), {
  ssr: false,
});
