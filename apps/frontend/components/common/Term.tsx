import {
  Box,
  CloseButton,
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text, Heading
} from "@chakra-ui/react";
import React from "react";
import {TerminationRule} from "./TerminationRule";
import dynamic from "next/dynamic";

type Props = {
  term: any;
  onChange: (field: string) => any;
  onAddTerminationRule: () => any
  onDeleteTerminationRule: (ruleIndex: number) => any;
  onDelete: () => any;
}

const Term = (props: Props) => {

  const {term, onChange: onChangeTerm, onAddTerminationRule, onDeleteTerminationRule, onDelete} = props;

  return (
    <Box>
      <Box>
        <Heading size={'md'}>ID: {term.ID}</Heading>
      </Box>
      <Flex>
        <Box className={'term'}>
          <HStack>
            <Box w='30%'>
              <Text fontSize='1xl'>Cрок:</Text>
            </Box>
            <Box>
              <Input htmlSize={4} width='auto' aria-label={'От'} className={'term-period-from'}
                     placeholder={'от'}
                     type={'number'}
                     value={term.periodFrom}
                     onChange={onChangeTerm('periodFrom')}/>
            </Box>
            <Box>
              <Input htmlSize={4} type={'number'} width='auto' className={'term-period-to'} value={term.periodTo}
                     placeholder={'до'}
                     onChange={onChangeTerm('periodTo')}/>
            </Box>
            <Box>
              <Select className={'term-period-unit'}
                      onChange={onChangeTerm('periodUnit')}>
                <option value={'days'}>дней</option>
                <option value={'months'}>месяцев</option>
              </Select>
            </Box>
          </HStack>
          <HStack>
            <Box w='30%'>
              <Text fontSize='1xl'>Стоимость:</Text>
            </Box>
            <HStack>
              <Box>
                <Input type={'number'} className={'term-price'} value={term.price} onChange={onChangeTerm('price')}/>
              </Box>
              <Box>
                <Select className={'term-currency'} onChange={onChangeTerm('priceUnit')}>
                  <option value={''}>Выберите валюту</option>
                  <option value={'RUB'}>Рубль</option>
                  <option value={'EUR'}>Евро</option>
                  <option value={'USD'}>Доллар</option>
                </Select>
              </Box>
            </HStack>
          </HStack>
          <HStack>
            <Box w='30%'>
              <Text fontSize='1xl'>Залог:</Text>
            </Box>
            <Box>
              <RadioGroup value={String(term.deposit.isEnabled)}
                          onChange={onChangeTerm('deposit.isEnabled')}>
                <Stack spacing={5} direction='row'>
                  <Radio className="with-deposit" colorScheme='green' value={'true'}>
                    С залогом
                  </Radio>
                  <Radio className={"without-deposit"}colorScheme='red' value={'false'}>
                    Без залога
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>

          </HStack>
          {term.deposit.isEnabled && (<>
            <HStack>
              <Box width='30%'>
                <Text fontSize='1xl'>Сумма залога:</Text>
              </Box>
              <Box>
                <Input className={'term-deposit-value'} type="number" value={term.deposit.value}
                       onChange={onChangeTerm('deposit.value')}/>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <Checkbox
                  className={'remove-deposit-price-affect-checkbox'}
                  checked={term.deposit.collectOptions[0].isEnabled}
                  onChange={onChangeTerm('deposit.collectOptions.0.isEnabled')}
                >
                  Убрать залог за дополнительную плату
                </Checkbox>

              </Box>
            </HStack>
            {term.deposit.collectOptions[0].isEnabled && (<HStack>
              <Box>
                <Input
                  className={'term-deposit-remove-deposit-price-affect'}
                  type="number"
                  htmlSize={4}
                  value={term.deposit.collectOptions[0].priceAffect}
                  onChange={onChangeTerm('deposit.collectOptions.0.priceAffect')}/>
              </Box>
              <Box>
                <Text fontSize='1xl'> руб. в месяц</Text>
              </Box>

            </HStack>)}
            <HStack>
              <Box>
                <Checkbox
                  className={'partial-deposit-price-affect-checkbox'}
                  checked={term.deposit.collectOptions[1].isEnabled}
                  onChange={onChangeTerm('deposit.collectOptions.1.isEnabled')}
                >
                  Разбить залог на два месяца
                </Checkbox>
              </Box>
            </HStack>
            {term.deposit.collectOptions[1].isEnabled && (<HStack>
              <Box>
                <Input
                  className={'term-deposit-partial-deposit-price-affect'}
                  type="number"
                  htmlSize={4}
                  value={term.deposit.collectOptions[1].priceAffect}
                  onChange={onChangeTerm('deposit.collectOptions.1.priceAffect')}
                />
              </Box>
              <Box>
                <Text fontSize='1xl'> руб. в месяц</Text>
              </Box>
            </HStack>)}
          </>)}
          <Flex>
            <Box width={'30%'}>
              <Text fontSize='1xl'>Условия раннего расторжения:</Text>
            </Box>
            <Box>
              <RadioGroup value={String(term.deposit.returnType)}
                          onChange={onChangeTerm('deposit.returnType')}>
                <Stack margin={2} spacing={5} direction='row'>
                  <Radio colorScheme='green' value={'RECALCULATE_PRICE'}>
                    Пересчет арендной ставки
                  </Radio>
                  <Radio colorScheme='green' value={'FULLY_WITHHELD_UPON_CONTRACT_TERMINATION'}>
                    Удерживается полностью
                  </Radio>
                  <Radio colorScheme='green' value={'REFOUND_IN_CASE_OF_1_MONTH_NOTICE'}>
                    Без удержаний
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Flex>
          {term.deposit.returnType === 'RECALCULATE_PRICE' && (<Box>
            <Box>
              <Button className={"add-termination-rule-btn"} size={'xs'} colorScheme={'green'} onClick={onAddTerminationRule}>+</Button>
            </Box>
            {term.terminationRules.map((rule, ruleIndex) => (
              <TerminationRule rule={rule} onChangeTerm={onChangeTerm} ruleIndex={ruleIndex}
                               onDelete={onDeleteTerminationRule(ruleIndex)}/>
            ))}
          </Box>)}

        </Box>
        <Box>
          <CloseButton colorScheme={'red'} size='lg' onClick={onDelete}/>
        </Box>
      </Flex>

      <hr/>
    </Box>
  )
}

export default dynamic(() => Promise.resolve(Term), {
  ssr: false
})
