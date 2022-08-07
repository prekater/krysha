import React from 'react';

import Term from '../common/Term';

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
    onChangeTerm,
    onAddTerminationRule,
    onDeleteTerminationRule,
    onDeleteTerm,
  } = props;

  return (
    <>
      {terms.map((term, index) => (
        <Term
          term={term}
          onChange={onChangeTerm(index)}
          onAddTerminationRule={onAddTerminationRule(index)}
          onDeleteTerminationRule={onDeleteTerminationRule(index)}
          onDelete={onDeleteTerm(index)}
          key={term.id}
        />
      ))}
    </>
  );
};
