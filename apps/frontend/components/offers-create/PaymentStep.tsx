import {Button, CloseButton, Flex, Heading, Input, Spacer, Text, Box, Select, Checkbox, HStack} from "@chakra-ui/react";
import React from "react";
import {usePayments} from "../../hooks/payments.hook";

type Props = {
  payments: any;
  onChangeStartOption: any;
  onChangeTwoPaymentsCheckbox: any;
  onChangeTwoPaymentsPriceAffect: any;
}


export const PaymentStep = ({payments, onChangeTwoPaymentsCheckbox, onChangeTwoPaymentsPriceAffect, onChangeStartOption}: Props) => {

  const psMap = {
    'START_OF_MONTH': 'Ежемесячная оплата первого числа каждого месяца',
    'START_OF_RENT': 'Ежемесячная оплата в день заключения договора, если договор начинается не с первого числа месяца'
  }

  return (
    <>
      <Heading
        size='md'
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}>Шаг 3</Heading>
      <Heading
        size='md'
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >
        Условия платежей
      </Heading>
      {payments.paymentStartOptions.map( (pso, i) => (
        <Box
          padding={'10px'}
          margin={'10px'}
          border={'1px solid black'}
        >
          <Checkbox
            className={pso.type}
            checked={pso.isEnabled}
            onChange={(e) => onChangeStartOption(i, e)}
          >
            {psMap[pso.type]}
          </Checkbox>
        </Box>
      ))}
      <Heading
        size='md'
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >
        Возможность разбивки платежей
      </Heading>

      <Box
        padding={'10px'}
        margin={'10px'}
        border={'1px solid black'}
      >
        <Checkbox
          className={payments.paymentTypeOptions[0].type}
          checked={payments.paymentTypeOptions[0].isEnabled}
          onChange={onChangeTwoPaymentsCheckbox}
        >
          Предложить опцию разбить на два платежа за дополнительные
        </Checkbox>
        <HStack>
          <Box>
            <Input
              className={'payment-price-affect'}
              disabled={!payments.paymentTypeOptions[0].isEnabled}
              value={payments.paymentTypeOptions[0].priceAffect}
              onChange={onChangeTwoPaymentsPriceAffect}
            />
          </Box>
          <Box> руб. в месяц</Box>
        </HStack>
      </Box>

      <br/>
    </>
  )

}
