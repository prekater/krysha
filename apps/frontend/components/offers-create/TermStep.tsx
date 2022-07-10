import {Button, Heading, Input, Spacer} from "@chakra-ui/react";
import Term from "../common/Term";
import React from "react";


type Props = {
  terms: any;
  onAddTerm: any;
  onChangeTerm: any;
  onAddTerminationRule: any;
  onDeleteTerminationRule: any
  onDeleteTerm: any
}

export const TermStep = (props: Props) => {
  const {terms, onChangeTerm, onAddTerminationRule, onDeleteTerminationRule, onDeleteTerm, onAddTerm} = props

  return (<>
    <Heading size='md'>Шаг 1: Условия аренды <Button id="add-term-btn" size={'xs'} onClick={onAddTerm} colorScheme={'green'}> +</Button></Heading>
    <br/>
    <hr/>
    {terms.map((term, index) => (
      <Term
        term={term}
        onChange={onChangeTerm(index)}
        onAddTerminationRule={onAddTerminationRule(index)}
        onDeleteTerminationRule={onDeleteTerminationRule(index)}
        onDelete={onDeleteTerm(index)}
      />
    ))}
  </>)

}
