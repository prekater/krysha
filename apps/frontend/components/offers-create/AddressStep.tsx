import {Button, CloseButton, Flex, Heading, Input, Spacer, Text, Box, Select} from "@chakra-ui/react";
import React from "react";
import {usePayments} from "../../hooks/payments.hook";
import {useAddress} from "../../hooks/address.hook";
import {useField} from "react-final-form-hooks";

type Props = {
  form: any,
}


export const AddressStep = (props: Props) => {
  const {form} = props
  const [
    city,
    house,
    street,
    flat
  ] = useAddress(form)

  const propertyType = useField('meta.propertyType', form)

  return (
    <>
      <Heading size='md'>Шаг 4: Адрес и тип жилья </Heading>
      <hr/>
      <br/>
      <Box>
        <Flex>
         <Box width={'5%'}> Город: </Box>
         <Box> <Input {...city.input} id="city" placeholder="Введите город"/></Box>
        </Flex>
        <Flex>
          <Box width={'5%'}> Улица: </Box>
          <Box><Input {...street.input} id="street" placeholder="Введите улицу"/></Box>
        </Flex>
        <Flex>
          <Box width={'5%'}>Дом: </Box>
          <Box><Input {...house.input} id="house" placeholder="Введите дом"/></Box>
        </Flex>
        <Flex>
          <Box width={'5%'}>Квартира: </Box>
          <Box><Input {...flat.input} id="flat" placeholder="Введите квартиру"/></Box>
        </Flex>
      </Box>
      <Box>
        <h1><strong>Тип жилья:</strong></h1>
        <Box width={'15%'}>
          <Select id="propertyType" {...propertyType.input}>
            <option value={''}>Выберите тип жилья</option>
            <option value={'ONE_ROOM'}>Однокомнатная</option>
            <option value={'TWO_ROOM'}>Двухкомнатная</option>
            <option value={'THREE_ROOM'}>Трехкомнатная</option>
            <option value={'FOUR_ROOM'}>Четырехкомнатная</option>
            <option value={'FIVE_ROOM'}>Пятикомнатная</option>
            <option value={'STUDIO'}>Студия</option>
          </Select>
        </Box>
      </Box>
    </>
  )

}
