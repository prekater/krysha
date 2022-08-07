import React from 'react';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';

type Props = {
  terms: any;
  currentTerm: any;
  onChange: (id: string) => void;
  termsContent: any;
};
export const TermStep = ({
  terms,
  termsContent,
  currentTerm,
  onChange,
}: Props) => {
  return (
    <>
      <Heading
        size="md"
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >
        Выбор условий аренды{' '}
      </Heading>
      {terms.map((t, i) => (
        <Box
          cursor={'pointer'}
          padding={'10px'}
          margin={'10px'}
          border={'1px solid black'}
          bg={t.ID === currentTerm?.ID ? 'tomato' : 'whitesmoke'}
          color={t.ID === currentTerm?.ID ? 'white' : 'black'}
          className={`term`}
          onClick={() => onChange(t.ID)}
        >
          {/*{t.ID === termId && (*/}
          {/*  <div>*/}
          {/*    <p>Введите дату начала аренды: </p>*/}
          {/*    <input className={'rental-period-start'} type="date" value={period.startDate}*/}
          {/*           onChange={onChangeRentalPeriod('startDate')}/>*/}
          {/*    <input className={'rental-period-end'} type="date" value={period.endDate}*/}
          {/*           onChange={onChangeRentalPeriod('endDate')}/>*/}
          {/*  </div>*/}
          {/*)}*/}

          <UnorderedList>
            <ListItem>
              <Text fontSize="1xl">
                Срок аренды от {t.periodFrom} до {t.periodTo}{' '}
                {termsContent[i].periodUnit}
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="1xl">
                Стоимость: {termsContent[i].pricePerMonth}
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="1xl">
                {t.deposit.isEnabled
                  ? `Депозит ${termsContent[i].deposit}`
                  : `Без депозита`}
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="1xl">В случае раннего расторжения договора:</Text>
              {t.terminationRules.length > 0 ? (
                <UnorderedList>
                  {termsContent[i].terminationRules.split(';').map((tr) => (
                    <ListItem>
                      <Text fontSize="1xl">{tr}</Text>
                    </ListItem>
                  ))}
                </UnorderedList>
              ) : (
                'без удержаний'
              )}
            </ListItem>
          </UnorderedList>
          <br />
        </Box>
      ))}
    </>
  );
};
