import React from 'react';
import styles from "../../offers-create/CheckStep/CheckStep.module.scss";

function CadastralNumber({number}) {
  return (
    <section className={styles.fieldsGroup_2col}>
      <h6 className={styles.fieldTitle}>Кадастровый номер: </h6>
      <p className={styles.fieldText}>{number}</p>
    </section>
  );
}

export default CadastralNumber;
