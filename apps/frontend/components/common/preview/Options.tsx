import React, {useMemo} from "react";
import styles from "../../offers-create/CheckStep/CheckStep.module.scss";

type Props = {
  options: any[];
}
export const Options = ({options}: Props) => {
  const enabledOptions = useMemo(() => {
    return options.filter(o => o.isEnabled)
  }, [options])
  const disabledOptions = useMemo(() => {
    return options.filter(o => !o.isEnabled)
  }, [options])

  return (
    <>
      <section className={styles.fieldsGroup_2col}>
        <h6 className={styles.fieldTitle}>Включено в стоимость: </h6>
        <div className={styles.fieldText}>{enabledOptions.map(
          o => (<p key={o.title}>{o.title}</p>)
        )}</div>
      </section>
      <section className={styles.fieldsGroup_2col}>
        <h6 className={styles.fieldTitle}>Не включено в стоимость: </h6>
        <div className={styles.fieldText}>{disabledOptions.map(
          o => (<p key={o.title}>{o.title}</p>)
        )}</div>
      </section>
    </>
  )


}

