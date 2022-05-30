import React from 'react';



export async function getServerSideProps({ params: { slug } }) {
  const res = await fetch(`http://localhost:3333/api/offers/${slug}`)
  const data = await res.json()


  return {
    props: { data }, // will be passed to the page component as props
  }
}
const Offer = (props) => {
  console.log(props.data)
  return (
    <div>

    </div>
  );
}

export default Offer;
