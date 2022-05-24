import React, {useState} from 'react'
import {useForm, useField} from 'react-final-form-hooks'
import {usePayments} from "../../../hooks/payments.hook";
import {useAddress} from "../../../hooks/address.hook";
import {useOptions} from "../../../hooks/options.hook";
import {useTerms} from "../../../hooks/terms.hook";

const onSubmit = async values => {

  console.log(values)
}
const validate = values => {
  const errors: any = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  return errors
}

const CreateOffer = () => {
  const {form, handleSubmit, values, pristine, submitting} = useForm({
    onSubmit,
    validate
  })
  // address group
  const [
    city,
    house,
    street,
    flat
  ] = useAddress(form)

  // payment group
  const [
    paymentStart,
    paymentType,
    penaltyCurrency,
    penaltyStart,
    penaltyValue,
    penaltyType]
    = usePayments(form)

  // property type

  const propertyType = useField('propertyType', form)
  // options block
  const {options, onChangeOption, onAddOption} = useOptions()
  const {terms, onAddTerm, onChangeTerm} = useTerms()


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1><strong>Адрес:</strong></h1>
          <div>
            <label>Город</label>
            <input {...city.input} placeholder="Введите город"/>
            {city.meta.touched &&
              city.meta.error && <span>{city.meta.error}</span>}
          </div>
          <div>
            <label>Улица</label>
            <input {...street.input} placeholder="Введите улицу"/>
            {street.meta.touched &&
              street.meta.error && <span>{street.meta.error}</span>}
          </div>
          <div>
            <label>Дом</label>
            <input {...house.input} placeholder="Введите дом"/>
            {house.meta.touched &&
              house.meta.error && <span>{house.meta.error}</span>}
          </div>
          <div>
            <label>Квартира</label>
            <input {...flat.input} placeholder="Введите квартиру"/>
            {flat.meta.touched &&
              flat.meta.error && <span>{flat.meta.error}</span>}
          </div>
        </div>
        <div>
          <h1><strong>Оплата:</strong></h1>
          <div>
            <label>Дата платежа</label>
            <select {...paymentStart.input}>
              <option value={''}>...</option>
              <option value={'START_OF_RENT'}>В дату начала аренды</option>
              <option value={'START_OF_MONTH'}>Первого числа каждого месяца</option>
            </select>
            {paymentType.meta.touched &&
              paymentType.meta.error && <span>{paymentType.meta.error}</span>}
          </div>
          <div>
            <label>Способ оплаты</label>
            <select {...paymentType.input}>
              <option value={''}>...</option>
              <option value={'ONE_PAYMENT'}>Один платеж в месяц</option>
              <option value={'TWO_PAYMENTS'}>Два платежа в месяц</option>
            </select>
            {street.meta.touched &&
              street.meta.error && <span>{street.meta.error}</span>}
          </div>
        </div>
        <div>
          <h1><strong>Штраф за неуплату:</strong></h1>
          <div>
            <label>Тип штрафа</label>
            <select {...penaltyType.input} >
              <option value={''}>Выберите тип штрафа</option>
              <option value={'ABSENT'}>Отсутствует</option>
              <option value={'FIX_FOR_EVERY_DAY'}>fix за каждый день просрочки</option>
            </select>
            {penaltyCurrency.meta.touched &&
              penaltyCurrency.meta.error && <span>{penaltyCurrency.meta.error}</span>}
          </div>
          {values.payment?.penalty?.type === 'FIX_FOR_EVERY_DAY' && (
            <>
              <div>
                <label>Начислять штраф, начиная с</label>
                <input {...penaltyStart.input} /> дня
              </div>
              <div>
                <label>Сумма штрафа (в день)</label>
                <input {...penaltyValue.input} />
                <select {...penaltyCurrency.input} placeholder="Выберите валюту">
                  <option value={''}>Выберите валюту</option>
                  <option value={'RUB'}>Рубль</option>
                  <option value={'EUR'}>Евро</option>
                  <option value={'USD'}>Доллар</option>
                </select>
              </div>
            </>
          )}
        </div>
        <div>
          <h1><strong>Тип жилья:</strong></h1>
          <select {...propertyType.input} >
            <option value={''}>Выберите тип жилья</option>
            <option value={'ONE_ROOM'}>Однокомнатная</option>
            <option value={'TWO_ROOM'}>Двухкомнатная</option>
            <option value={'THREE_ROOM'}>Трехкомнатная</option>
            <option value={'FOUR_ROOM'}>Четырехкомнатная</option>
            <option value={'FIVE_ROOM'}>Пятикомнатная</option>
            <option value={'STUDIO'}>Студия</option>
          </select>
        </div>
        <div>
          <h1><strong>Съемщик платит за:</strong></h1>
          {options.map((o, i) => (
            <div>
              <input value={o.title} onChange={onChangeOption(i)}/>
              <hr/>
            </div>))}
          <button onClick={onAddOption}> Добавить опцию</button>
        </div>

        <hr/>
        <div>
          <h1><strong>Условия аренды:</strong></h1>
          {terms.map((term, i) => (
            <div>
              <div>
                <label> Валюта оплаты</label>
                <select onChange={onChangeTerm(i, 'priceUnit')}>
                  <option value={''}>Выберите валюту</option>
                  <option value={'RUB'}>Рубль</option>
                  <option value={'EUR'}>Евро</option>
                  <option value={'USD'}>Доллар</option>
                </select>
              </div>
              <div>
                <h3> Депозит: </h3>
                <h4> При заключении контракта</h4>
                <div>
                  <label>Сумма</label>
                  <input value={term.deposit.value} onChange={onChangeTerm(i, 'deposit.value')}/> {term.priceUnit}
                </div>
                <div>
                  <label>Срок возврата</label>
                  <input value={term.deposit.returnPeriod} onChange={onChangeTerm(i, 'deposit.returnPeriod')}/>
                  <select onChange={onChangeTerm(i, 'deposit.returnPeriodUnit')}>
                    <option value={''}>Выберите единицы времени для возврата</option>
                    <option value={'days'}>дней</option>
                    <option value={'months'}>месяцев</option>
                    <option value={'years'}>лет</option>
                  </select>
                </div>
                <div>
                  <select onChange={onChangeTerm(i, 'deposit.collectType')}>
                    <option>....</option>
                    <option value={'CONCLUSION'}> Оплачивается сразу</option>
                    <option value={'PARTIAL'}> Частями</option>
                    <option value={'ABSENT'}> Отсутствует</option>
                    <option value={'ABSENT_WITH_EXTRA_CHARGE'}> Отсутствует с доплатой</option>
                  </select>
                </div>

              </div>
              <hr/>
            </div>
          ))}
          <button onClick={onAddTerm}> Добавить условие</button>
        </div>

        <div className="buttons">
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            onClick={() => form.reset()}
            disabled={submitting || pristine}
          >
            Reset
          </button>
        </div>
        <pre>{JSON.stringify(values, undefined, 2)}</pre>
        <pre>{JSON.stringify(options, undefined, 2)}</pre>
        <pre>{JSON.stringify(terms, undefined, 2)}</pre>
      </form>
    </>
  )
}

export default CreateOffer
