import React from 'react'
import {useForm, useField} from 'react-final-form-hooks'
import {usePayments} from "../../../hooks/payments.hook";
import {useAddress} from "../../../hooks/address.hook";
import {useOptions} from "../../../hooks/options.hook";
import {useTerms} from "../../../hooks/terms.hook";
import axios from 'axios'

const validate = values => {
  const errors: any = {}
  // if (!values.firstName) {
  //   errors.firstName = 'Required'
  // }
  // if (!values.lastName) {
  //   errors.lastName = 'Required'
  // }
  return errors
}

const CreateOffer = () => {

  // terms block
  const {terms, onAddTerm, onChangeTerm, onAddTerminationRule} = useTerms()

  // options block
  const {options, onChangeOption, onAddOption} = useOptions()

  const onSubmit = async values => {

    const payload = {
      ...values,
      options,
      terms,
      authorId: 'weofkwpfokw'
    }


   await axios.post(`http://ec2-44-200-125-244.compute-1.amazonaws.com:3333/api/api/offers`, payload)

  }
  const {form, handleSubmit, values} = useForm({
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


  const propertyType = useField('meta.propertyType', form)


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1><strong>Адрес:</strong></h1>
          <div>
            <label>Город</label>
            <input {...city.input} id="city" placeholder="Введите город"/>

          </div>
          <div>
            <label>Улица</label>
            <input {...street.input} id="street" placeholder="Введите улицу"/>

          </div>
          <div>
            <label>Дом</label>
            <input {...house.input} id="house" placeholder="Введите дом"/>

          </div>
          <div>
            <label>Квартира</label>
            <input {...flat.input} id="flat" placeholder="Введите квартиру"/>

          </div>
        </div>
        <div>
          <h1><strong>Оплата:</strong></h1>
          <div>
            <label>Дата платежа</label>
            <select id="paymentStart" {...paymentStart.input}>
              <option value={''}>...</option>
              <option value={'START_OF_RENT'}>В дату начала аренды</option>
              <option value={'START_OF_MONTH'}>Первого числа каждого месяца</option>
            </select>
          </div>
          <div>
            <label>Способ оплаты</label>
            <select id="paymentType" {...paymentType.input}>
              <option value={''}>...</option>
              <option value={'ONE_PAYMENT'}>Один платеж в месяц</option>
              <option value={'TWO_PAYMENTS'}>Два платежа в месяц</option>
            </select>

          </div>
        </div>
        <div>
          <h1><strong>Штраф за неуплату:</strong></h1>
          <div>
            <label>Тип штрафа</label>
            <select id="penaltyType" {...penaltyType.input} >
              <option value={''}>Выберите тип штрафа</option>
              <option value={'ABSENT'}>Отсутствует</option>
              <option value={'FIX_FOR_EVERY_DAY'}>fix за каждый день просрочки</option>
            </select>
          </div>
          {values.payment?.penalty?.type === 'FIX_FOR_EVERY_DAY' && (
            <>
              <div>
                <label>Начислять штраф, начиная с</label>
                <input id="penaltyStart" {...penaltyStart.input} /> дня
              </div>
              <div>
                <label>Сумма штрафа (в день)</label>
                <input id="penaltyValue" {...penaltyValue.input} />
                <select id="penaltyCurrency" {...penaltyCurrency.input} placeholder="Выберите валюту">
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
          <select id="propertyType" {...propertyType.input}>
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
              <input value={o.title} className={'option'} onChange={onChangeOption(i)}/>
              <hr/>
            </div>))}
          <input type="button" id="add-option-btn" onClick={onAddOption} value={'Добавить опцию'}/>
        </div>

        <hr/>
        <div>
          <h1><strong>Условия аренды:</strong></h1>
          {terms.map((term, termIndex) => (
            <div>
              <div className={'term'}>
                <label>Стоимость: </label>
                <input className={'term-price'} value={term.price} onChange={onChangeTerm(termIndex, 'price')}/> {term.price}
                <select className={'term-currency'} onChange={onChangeTerm(termIndex, 'priceUnit')}>
                  <option value={''}>Выберите валюту</option>
                  <option value={'RUB'}>Рубль</option>
                  <option value={'EUR'}>Евро</option>
                  <option value={'USD'}>Доллар</option>
                </select>
              </div>
              <div>
                <h3>Период: </h3>
                <label> от: </label>
                <input className={'term-period-from'} value={term.periodFrom} onChange={onChangeTerm(termIndex, 'periodFrom')}/> {term.periodFrom}
                <label> до: </label>
                <input className={'term-period-to'} value={term.periodTo} onChange={onChangeTerm(termIndex, 'periodTo')}/> {term.periodTo}
                <select className={'term-period-unit'} onChange={onChangeTerm(termIndex, 'periodUnit')}>
                  <option value={'days'}>дней</option>
                  <option value={'months'}>месяцев</option>
                </select>

              </div>
              <div>
                <h3> Депозит: </h3>
                <h4> При заключении контракта</h4>
                <div >
                  <label>Сумма</label>
                  <input className={'term-deposit-value'} type="number" value={term.deposit.value}
                         onChange={onChangeTerm(termIndex, 'deposit.value')}/> {term.priceUnit}
                </div>
                <div>
                  <label>Срок возврата</label>
                  <input className={'term-deposit-return-period'} value={term.deposit.returnPeriod} onChange={onChangeTerm(termIndex, 'deposit.returnPeriod')}/>
                  <select className={'term-deposit-return-period-unit'} onChange={onChangeTerm(termIndex, 'deposit.returnPeriodUnit')}>
                    <option value={''}>Выберите единицы времени для возврата</option>
                    <option value={'days'}>дней</option>
                    <option value={'months'}>месяцев</option>
                    <option value={'years'}>лет</option>
                  </select>
                </div>
                <div>
                  <select className={'term-deposit-collect-type'} onChange={onChangeTerm(termIndex, 'deposit.collectType')}>
                    <option>....</option>
                    <option value={'CONCLUSION'}> Оплачивается сразу</option>
                    <option value={'PARTIAL'}> Частями</option>
                    <option value={'ABSENT'}> Отсутствует</option>
                    <option value={'ABSENT_WITH_EXTRA_CHARGE'}> Отсутствует с доплатой</option>
                  </select>
                </div>
                <div>
                  <h3>Условия разрыва контракта</h3>
                  {term.terminationRules.map((rule, ruleIndex) => (
                    <div>
                      <h4>Найм на период менее </h4>
                      <input
                        className={'term-termination-rule-period'}
                        type="number"
                        value={term.terminationRules[ruleIndex].period}
                        onChange={onChangeTerm(termIndex, `terminationRules.${ruleIndex}.period`)}
                      />
                      <select className={'term-termination-rule-period-unit'} onChange={onChangeTerm(termIndex, `terminationRules.${ruleIndex}.periodUnit`)}>
                        <option value={'months'}>месяцев</option>
                        <option value={'days'}>дней</option>
                        <option value={'years'}>лет</option>
                      </select>

                      <h4>Оплата </h4>
                      <input
                        className={'term-termination-rule-value'}
                        type="number"
                        value={term.terminationRules[ruleIndex].value}
                        onChange={onChangeTerm(termIndex, `terminationRules.${ruleIndex}.value`)}
                      />
                      <select className={'term-termination-rule-currency'} onChange={onChangeTerm(termIndex, `terminationRules.${ruleIndex}.currency`)}>
                        <option value={'RUB'}>Рубль</option>
                        <option value={'EUR'}>Евро</option>
                        <option value={'USD'}>Доллар</option>
                      </select> в месяц
                    </div>
                  ))}
                  <input type="button" className={"add-termination-rule-btn"} onClick={onAddTerminationRule(termIndex)} value={'Добавить условие разрыва контракта'}/>
                </div>
              </div>
              <hr/>
            </div>
          ))}
          <input type="button" id="add-term-btn" onClick={onAddTerm} value={'Добавить условие'}/>
        </div>

        <div className="buttons">
          <button type="submit">Submit</button>
        </div>
        {/*<pre>{JSON.stringify(values, undefined, 2)}</pre>*/}
        {/*<pre>{JSON.stringify(options, undefined, 2)}</pre>*/}
        {/*<pre>{JSON.stringify(terms, undefined, 2)}</pre>*/}
      </form>
    </>
  )
}

export default CreateOffer
