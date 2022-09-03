import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  Heading,
  HStack,
  Input,
  ListItem,
  Select,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

type Props = {
  unit: string;
  payment: any;
  onChangePaymentStart: any;
  onChangePaymentType: any;
};

export const PaymentStep = ({
  payment,
  unit,
  onChangePaymentStart,
  onChangePaymentType,
}: Props) => {
  let periodUnit;
  switch (unit) {
    case 'days':
      periodUnit = 'день';
      break;
    case 'months':
      periodUnit = 'месяц';
      break;
    case 'years':
      periodUnit = 'год';
      break;
  }
  const psMap = {
    START_OF_MONTH: 'Ежемесячная оплата первого числа каждого месяца',
    START_OF_RENT:
      'Ежемесячная оплата в день заключения договора, если договор начинается не с первого числа месяца',
  };
  const ptMap = {
    ONE_PAYMENT: 'Одним платежом',
    TWO_PAYMENTS: `Разбить на два платежа за дополнительные %s руб. в ${periodUnit} к сумме аренды`,
  };
  return (
    <>
      <Heading
        size="md"
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >
        Условия платежей
      </Heading>
      <br />
      <Heading
        size="md"
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >
        Начало оплаты
      </Heading>

      {payment.paymentStartOptions.map((pso, i) => (
        <Box padding={'10px'} margin={'10px'} border={'1px solid black'}>
          <Checkbox
            className={pso.type}
            checked={pso.isEnabled}
            disabled={
              !pso.isEnabled &&
              payment.paymentStartOptions.some((pso) => pso.isEnabled)
            }
            onChange={(e) => onChangePaymentStart(i, e)}
          >
            {psMap[pso.type]}
          </Checkbox>
        </Box>
      ))}

      <Heading
        size="md"
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >
        Тип оплаты
      </Heading>
      {payment.paymentTypeOptions.map((pto, i) => (
        <Box padding={'10px'} margin={'10px'} border={'1px solid black'}>
          <Checkbox
            checked={pto.isEnabled}
            disabled={
              !pto.isEnabled &&
              payment.paymentTypeOptions.some((pso) => pso.isEnabled)
            }
            onChange={(e) => onChangePaymentType(i, e)}
          >
            {ptMap[pto.type].replace('%s', pto.priceAffect)}
          </Checkbox>
        </Box>
      ))}
    </>
  );
};
