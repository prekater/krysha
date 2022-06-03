import React from 'react';
import axios from 'axios'
import {useRouter} from "next/router";


function Index(props) {


  const router = useRouter()

  router.query.slug && axios.get(
   ` http://localhost:3333/api/contracts/${router.query.slug}/export`,
    {responseType: 'blob'} // !!!
  ).then((response) => {
    window.open(URL.createObjectURL(response.data));
  })
  return (
    <div></div>
  );
}

export default Index;
