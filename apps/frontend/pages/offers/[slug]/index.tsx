import React from 'react'

import {OfferChooseStepLayout} from "../../../components/ui/OfferChooseStepLayout";

export async function getServerSideProps({params: {slug}}) {
  const res = await fetch(`http://ec2-3-94-232-213.compute-1.amazonaws.com:3333/api/offers/${slug}`)
  const data = await res.json()

  return {
    props: {data},
  }
}

const ChooseOffer = (offer) => {
  return (
    <OfferChooseStepLayout offer={offer.data}/>
  )
}

export default ChooseOffer
