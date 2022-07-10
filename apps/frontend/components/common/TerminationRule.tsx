import {Box, Button, CloseButton, Flex, Input, Select, Text} from "@chakra-ui/react";
import React from "react";

type Props = {
  rule: any;
  ruleIndex: number;
  onChangeTerm: (field: string) => any;
  onDelete: () => any;
}
export const TerminationRule = (props: Props) => {

  const { rule, onChangeTerm, ruleIndex, onDelete} = props

  return (
    <Flex>
      <Box width={'3%'}>
        <Text fontSize='1xl'>По:</Text>
      </Box>

      <Box width={'10%'}>
        <Input
          className={'term-termination-rule-value'}
          type="number"
          value={rule.value}
          onChange={onChangeTerm( `terminationRules.${ruleIndex}.value`)}
        />
      </Box>
      <Box width={'15%'}>
        <Select className={'term-termination-rule-currency'}
                onChange={onChangeTerm( `terminationRules.${ruleIndex}.currency`)}>
          <option value={'RUB'}>Рубль</option>
          <option value={'EUR'}>Евро</option>
          <option value={'USD'}>Доллар</option>
        </Select>
      </Box>
      <Box width={'25%'}>
        <Text fontSize='1xl'>в месяц при расторжении до</Text>
      </Box>
      <Box width={'15%'}>
        <Input
          className={'term-termination-rule-period'}
          type="number"
          value={rule.period}
          onChange={onChangeTerm( `terminationRules.${ruleIndex}.period`)}
        />
      </Box>
      <Box>
        <Select className={'term-termination-rule-period-unit'}
                onChange={onChangeTerm( `terminationRules.${ruleIndex}.periodUnit`)}>
          <option value={'months'}>месяцев</option>
          <option value={'days'}>дней</option>
          <option value={'years'}>лет</option>
        </Select>
      </Box>
      <Box>
        <CloseButton size={'lg'} onClick={onDelete}/>
      </Box>

    </Flex>
  )
}
