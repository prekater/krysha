import styles from "../../offers-create/CheckStep/CheckStep.module.scss";
import React from "react";
import {MappingType, useMapping} from "../../../hooks/mapping.hook";

type Props = {
  periodFrom: string;
  periodTo: string;
  price: number;
  periodUnit: string;
  priceUnit: string;
}
export const DurationAndPrice = ({periodFrom, periodTo, price, periodUnit, priceUnit}: Props) => {
  const periodText = useMapping(MappingType.PERIOD, periodUnit)
  const currencyText = useMapping(MappingType.CURRENCY, priceUnit)


  return <>
    <section>
      <h6 className={styles.fieldTitle}>Срок</h6>
      <p className={styles.fieldText}>От {periodFrom} до {periodTo} {periodText.PLURAL} </p>
    </section>
    <section>
      <h6 className={styles.fieldTitle}>Стоимость</h6>
      <p
        className={styles.fieldText}>{new Intl.NumberFormat('de-DE').format(price)} {currencyText} в {periodText.SINGLE}</p>
    </section>
  </>
}
