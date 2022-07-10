import React, {useState} from "react";
import {Box, Checkbox, Heading, ListItem, Radio, RadioGroup, Stack, Text, UnorderedList} from "@chakra-ui/react";

type Props = {
  deposit: any;
  onChangeDepositOption: any;
}
export const DepositStep = ({deposit, onChangeDepositOption}: Props) => {


  const [defaultValue, setDefault] = useState<boolean>(false)

  const onChangeDefault = () =>  {
    setDefault( prev => !prev)
  }
  const depositTranslateMap = {
    "ABSENT_WITH_EXTRA_CHARGE": `Без депозита за дополнительные %s руб.`,
    "PARTIAL": 'Внесение %s руб. двумя равными платежами. Первый платеж при заключении контракта'
  }

  const isDisabled = o => defaultValue || deposit
    .collectOptions
    .filter(option => option !== o)
    .some(option => option.isEnabled)


  return (
    <>
      <Heading
        size='md'
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >
        Условия залога
      </Heading>


      {deposit.isEnabled && (<>
        <Box
          padding={'10px'}
          margin={'10px'}
          border={'1px solid black'}
        >
          <Checkbox
            checked={defaultValue}
            onChange={onChangeDefault}
            disabled={ deposit.collectOptions.some(o => o.isEnabled)}
          >Внесение {deposit.value} руб. при заключении договора
          </Checkbox>
        </Box>
        {deposit.collectOptions.map((o, i) => (
          <Box
            padding={'10px'}
            margin={'10px'}
            border={'1px solid black'}
          >
            <Checkbox
              checked={o.isEnabled}
              disabled={isDisabled(o)}
              onChange={(e) => onChangeDepositOption(i, e)}
            >
              { depositTranslateMap[o.type].replace('%s', o.priceAffect)}
            </Checkbox>
          </Box>

        ))}
      </>)}


    </>
  )
}
