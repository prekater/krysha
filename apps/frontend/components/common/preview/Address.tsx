import React from 'react';
import styles from "../../offers-create/CheckStep/CheckStep.module.scss";

function Address({address}) {


  const {city, house, street, flat} = address
  const addressText = `${city}, ${street}, дом ${house}, квартира ${flat}`

  return (
    <>
      <section className={styles.fieldsGroup_2col}>
        <h6 className={styles.fieldTitle}>Адрес жилья: </h6>
        <p className={styles.fieldText}>{addressText}</p>
      </section>


    </>
  );
}

export default Address;
