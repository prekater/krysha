import React, {useEffect, useState} from 'react';
import {Box, Heading, HStack, Input, Select, Text} from '@chakra-ui/react';
import {reverseDate} from '../../utils';

type Props = {
  onChange: (key: string) => (value: string) => void;
  range: number[];
  unit: string;
  period: any;
};

export const RentalPeriodStep = ({period, unit, range, onChange}: Props) => {
  let periodUnit;
  const [duration, setDuration] = useState(range[0]);

  switch (unit) {
    case 'days':
      periodUnit = 'дней';
      break;
    case 'months':
      periodUnit = 'месяцев';
      break;
    case 'years':
      periodUnit = 'лет';
      break;
  }

  useEffect(() => {
    onChangeEnd(duration);
  }, [period.startDate]);

  const onChangeStart = (date: string) => {
    onChange('startDate')(reverseDate(date));
  };

  const onChangeEnd = (value: number) => {
    const date = new Date(reverseDate(period.startDate));
    let endDate;
    switch (unit) {
      case 'days':
        endDate = new Date(date.setDate(date.getDate() + value));
        break;
      case 'months':
        endDate = new Date(date.setMonth(date.getMonth() + value));
        break;
      case 'years':
        endDate = new Date(date.setFullYear(date.getFullYear() + value));
        break;
    }
    onChange('endDate')(endDate.toLocaleDateString('ru-RU'));
  };

  useEffect(() => {
    onChangeEnd(duration);
  }, [duration]);

  return (
    <>
      <Heading
        size="md"
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >
        Выбрать дату начала аренды{' '}
      </Heading>
      <Box
        cursor={'pointer'}
        padding={'10px'}
        margin={'10px'}
        border={'1px solid black'}
      >
        <Input type={'date'} onChange={(e) => onChangeStart(e.target.value)}/>
      </Box>
      <Heading
        size="md"
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >
        На какое количество {periodUnit} заключим контракт?
      </Heading>

      <HStack>
        <Box cursor={'pointer'} padding={'10px'} margin={'10px'}>
          <Select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            {
              Array.from({length: range[1]}, (_, i) => i + 1)
                .slice(range[0] - 1)
                .map((o) => (
                  <option value={o}>{o}</option>
                ))
            }
          </Select>
        </Box>
        <Box
          cursor={'pointer'}
          padding={'10px'}
          margin={'10px'}
          border={'1px solid black'}
        >
          <Text>
            Раннее расторжение договора будет считаться от {duration}{' '}
            {periodUnit}
          </Text>
        </Box>
      </HStack>
    </>
  );
};
