import React from 'react';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';

type Props = {
  options: any;
};
export const OptionsStep = ({ options }: Props) => {
  return (
    <>
      <Heading
        size="md"
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >
        Включено стоимость аренды{' '}
      </Heading>
      <Box
        cursor={'pointer'}
        padding={'10px'}
        margin={'10px'}
        border={'1px solid black'}
      >
        <UnorderedList>
          {options
            .filter((o) => o.isEnabled)
            .map((o) => (
              <ListItem>{o.title}</ListItem>
            ))}
        </UnorderedList>
      </Box>
      <Heading
        size="md"
        border={'1px solid black'}
        padding={'10px'}
        margin={'10px'}
      >
        Арендатор оплачивает дополнительно{' '}
      </Heading>
      <Box
        cursor={'pointer'}
        padding={'10px'}
        margin={'10px'}
        border={'1px solid black'}
      >
        <UnorderedList>
          {options
            .filter((o) => !o.isEnabled)
            .map((o) => (
              <ListItem>{o.title}</ListItem>
            ))}
        </UnorderedList>
      </Box>
    </>
  );
};
