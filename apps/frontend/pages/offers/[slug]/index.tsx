import React, {useState} from 'react';

export async function getServerSideProps({ params: { slug } }) {
  const res = await fetch(`http://localhost:3333/api/offers/${slug}`)
  const data = await res.json()

  return {
    props: { data },
  }
}
const Offer = ({data: offer}) => {

  const [term, setTerm] = useState(null)
  return (
    <div>

      <h1> Оффер ${offer.ID}</h1>

      <h3>Адрес</h3>

      <p>Город: ${offer.address.city}</p>
      <p>Улица: ${offer.address.street}</p>
      <p>Дом: ${offer.address.house}</p>
      <p>Квартира: ${offer.address.flat}</p>


      <h3>Выплата</h3>



    </div>
  );
}

export default Offer;
