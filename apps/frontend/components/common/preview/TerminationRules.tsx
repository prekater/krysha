import styles from "../../offers-create/CheckStep/CheckStep.module.scss";
import React from "react";
import {MappingType, useMapping} from "../../../hooks/mapping.hook";

type Props = {
  terminationRules: any[]
  priceUnit: string;
  periodUnit: string;
}
export const TerminationRules = ({terminationRules, priceUnit, periodUnit}: Props) => {
  const currencyText = useMapping(MappingType.CURRENCY, priceUnit)
  const periodText = useMapping(MappingType.PERIOD, periodUnit)

  return (
    <section className={styles.fieldsGroup_2col}>
      <h6 className={styles.fieldTitle}>Условия раннего расторжения</h6>
      <div className={styles.fieldText}>{terminationRules.length > 0 ?
        terminationRules.map((r, i) => (
          <p key={i}> Если договор расторгнут по инициативе арендатора ранее, чем через {r.period} {periodText.PLURAL},
            регулярный платеж увеличится на {r.value} {currencyText}.</p>)) :
        'Отсутствуют'}</div>
    </section>
  )
}
