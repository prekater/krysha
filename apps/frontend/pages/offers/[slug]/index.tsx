import React, {useState} from 'react';
import axios from 'axios'
import {useRouter} from "next/router";

export async function getServerSideProps({params: {slug}}) {
  const res = await fetch(`http://ec2-44-200-125-244.compute-1.amazonaws.com:3333/api/offers/${slug}`)
  const data = await res.json()

  return {
    props: {data},
  }
}

const Offer = ({data: offer}) => {

  const router = useRouter()
  const [termId, setTermId] = useState(null)


  const reverseDate = (date) => date.split('-').reverse().join('-')
  const initalPeriod = {
    startDate: '',
    endDate: '',
  }


  const [period, setPeriod] = useState(initalPeriod)

  const onChangeRentalPeriod = key => (e) => {

    setPeriod(prevState => {
      return ({...prevState, [key]: e.target.value})
    })
  }

  const onSubmit = async () => {

    const payload = {
      offerId: offer.ID,
      termId,
      rentalStart: reverseDate(period.startDate),
      rentalEnd: reverseDate(period.endDate),
    }

    const {data} = await axios.post(`http://ec2-44-200-125-244.compute-1.amazonaws.com:3333/api/contracts`, payload)



    router.push(`http://ec2-44-200-125-244.compute-1.amazonaws.com:3000/contracts/${data.resourceId}`)


  }
  return (
    <div>

      <h1> Оффер {offer.ID}</h1>

      <h3>Адрес</h3>

      <p>{offer.address.city}</p>
      <p>{offer.address.street}</p>
      <p>{offer.address.house}</p>
      <p>{offer.address.flat}</p>


      <h3>{offer.meta.propertyType}</h3>
      <h3>Оплата</h3>

      <p>{offer.payment.paymentRules}({offer.payment.paymentType})</p>
      <p>{offer.payment.penalty}</p>

      <h3><i>Арендатор платит за {offer.options.option}</i></h3>

      <h3>Выберите условие</h3>
      {offer.terms.map((t) => (
        <div className={`term ${t.ID === termId ? 'picked' : ''}`} onClick={() => setTermId(t.ID)}>

          {t.ID === termId && (
            <div>
              <p>Введите дату начала аренды: </p>
              <input className={'rental-period-start'} type="date" value={period.startDate}
                     onChange={onChangeRentalPeriod('startDate')}/>
              <input className={'rental-period-end'} type="date" value={period.endDate}
                     onChange={onChangeRentalPeriod('endDate')}/>
            </div>
          )}


          <p>Стоимость в месяц: {t.pricePerMonth}</p>
          <p>Депозит: {t.deposit}</p>
          <p>{t.depositCollectType}</p>
          <p>Депозит возвращается {t.depositReturnPeriod}</p>
          <p>{t.depositReturnType}</p>
          <p>{t.terminationRules}</p>

          <br/>
        </div>
      ))}


      <button disabled={!(termId && period)} onClick={onSubmit} id={'create-contract'}>Сформировать контракт</button>

    </div>
  );
}

export default Offer;
