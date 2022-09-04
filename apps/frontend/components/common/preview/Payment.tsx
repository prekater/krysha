import React, {useMemo} from 'react';
import styles from "../../offers-create/CheckStep/CheckStep.module.scss";

type Props = {
  data: any;
}
export function Payment({data}: Props) {
  const psMap = {
    START_OF_MONTH: 'Первого числа каждого месяца',
    START_OF_RENT: 'По дате заключения договора',
  };
  const enabledPaymentStartOptions: any[] = useMemo(() => data.paymentStartOptions
    .filter(({isEnabled}) => isEnabled), [data])

  return (
   <>
     <section className={styles.fieldsGroup_2col}>
       <h6 className={styles.fieldTitle}>Ежемесячная оплата: </h6>
       <div className={styles.fieldText}>{
         enabledPaymentStartOptions.map(pso => (<p>{psMap[pso.type]}</p>))}</div>
     </section>
     <section className={styles.fieldsGroup_2col}>
       <h6 className={styles.fieldTitle}>Возможность разбить платежи: </h6>
       <p className={styles.fieldText}>{data.paymentTypeOptions
         .find(({isEnabled, type}) => isEnabled && type === 'TWO_PAYMENTS') ? 'Да' : 'Нет'}</p>
     </section>
   </>
  );
}
