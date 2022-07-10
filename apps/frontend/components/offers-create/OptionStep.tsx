import {Button, CloseButton, Flex, Heading, Input, Spacer, Text, Box} from "@chakra-ui/react";
import React from "react";

type Props = {
  options: any;
  onChangeOption: any;
  onAddOption: any;
  onRemoveOption: any;
}
type ItemProps = {
  className: string;
  value: string;
  onChange: any;
  onRemove: any;
}

const OptionItem = (props: ItemProps) => {

  const {value, onChange, onRemove, className} = props

  return (
    <Flex>
      <Box><Input value={value} className={className} onChange={onChange}/></Box>
      <Box><CloseButton onClick={onRemove}/></Box>
      <hr/>
    </Flex>)
}

export const OptionStep = (props: Props) => {
  const {options, onAddOption, onChangeOption, onRemoveOption} = props

  const groupedOptions = options.reduce((result, item, index) => {

    const key = item.isEnabled ? 'include' : 'exclude'

    result[key] = result[key].concat([{
      title: item.title,
      isEnabled: item.isEnabled,
      index
    }])

    return result
  }, {
    include: [],
    exclude: []
  })

  return (<>
    <Heading size='md'>Шаг 2: Опции</Heading>
    <Text fontSize='2xl'>
      Включено в стоимость аренды <Button id="add-enabled-option-btn" size={'xs'} onClick={onAddOption(true)}
                                          colorScheme={'green'}> +</Button>
    </Text>
    {groupedOptions['include'].map((o) => (
      <OptionItem className={'enabled-option'} value={o.title} onChange={onChangeOption(o.index)} onRemove={onRemoveOption(o.index)}/>))}
    <Text fontSize='2xl'>
      Арендатор Оплачивает дополнительно <Button id="add-disabled-option-btn" size={'xs'} onClick={onAddOption(false)}
                                                 colorScheme={'green'}> +</Button>
    </Text>
    {groupedOptions['exclude'].map((o) => (
      <OptionItem className={'disabled-option'} value={o.title} onChange={onChangeOption(o.index)} onRemove={onRemoveOption(o.index)}/>))}
  </>)

}
