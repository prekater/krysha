import React, {useEffect, useState} from 'react';

import Term from '../common/Term';
import clsx from 'clsx';
import styles from '../common/Term.module.scss';
import { DeleteButton } from '../ui/DeleteButton';
import { AddButton } from '../ui/AddButton';

type Props = {
  terms: any;
  onAddTerm: any;
  onChangeTerm: any;
  onAddTerminationRule: any;
  onDeleteTerminationRule: any;
  onDeleteTerm: any;
};

export const TermStep = (props: Props) => {
  const {
    terms,
    onAddTerm,
    onChangeTerm,
    onAddTerminationRule,
    onDeleteTerminationRule,
    onDeleteTerm,
  } = props;
  const variantsLabels = terms.map((_, i) => `${i + 1} вариант`);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(terms.length - 1)
  }, [terms.length])

  const termVariantClassName = (index: number) =>
    clsx(styles.termVariant, {
      [styles.termVariant_active]: index === activeIndex,
    });
  const handleClickVariantBtn = (index: number) => () => setActiveIndex(index);

  return (
    <>
      <article className={styles.root}>
        <div className={styles.variantsTags}>
          <aside className={styles.termOptions}>
            {variantsLabels.map((item, index) => (
              <div
                className={`variant-btn ${termVariantClassName(index)}`}
                key={index}
                onClick={handleClickVariantBtn(index)}
              >
                {item}
              </div>
            ))}
            {/*@TODO добавить ховер*/}
            {terms.length > 1 && (
              <DeleteButton
                handleClick={onDeleteTerm(activeIndex)}
                text="Удалить"
              />
            )}
          </aside>
          <AddButton
            id={'add-term-btn'}
            handleClick={() => onAddTerm()}
            text="Добавить вариант условий"
            customTextStyle={styles.addTermButton}
          />
        </div>
      </article>

      {terms[activeIndex] && (<Term
        term={terms[activeIndex]}
        onChange={onChangeTerm(activeIndex)}
        onAddTerminationRule={onAddTerminationRule(activeIndex)}
        onDeleteTerminationRule={onDeleteTerminationRule(activeIndex)}
        onDelete={onDeleteTerm(activeIndex)}
        key={terms[activeIndex].id}
      />)}
    </>
  );
};
