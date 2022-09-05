import React from 'react';
import styles from "../../offers-create/CheckStep/CheckStep.module.scss";

function PropertyType({type}) {
  const propertyTypes = {
    ONE_ROOM: 'Однокомнатная квартира',
    TWO_ROOM: 'Двухкомнатная квартира',
    THREE_ROOM: 'Трехкомнатная квартира',
    FOUR_ROOM: 'Четырехкомнатная квартира',
    FIVE_ROOM: 'Пятикомнатная квартира',
    STUDIO: 'Студия',
  };
  return (
    <section className={styles.fieldsGroup_2col}>
      <h6 className={styles.fieldTitle}>Тип жилья: </h6>
      <p className={styles.fieldText}>{propertyTypes[type]}</p>
    </section>
  );
}

export default PropertyType;
