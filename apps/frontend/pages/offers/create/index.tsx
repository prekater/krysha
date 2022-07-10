import React, {useState} from 'react'
import {
  Box,
  Button,
  Container
} from '@chakra-ui/react'
import axios from 'axios'
import {useRouter} from "next/router";
import {useForm} from 'react-final-form-hooks'

import {useOptions} from "../../../hooks/options.hook";
import {TermStep} from "../../../components/offers-create/TermStep";
import {useTerms} from "../../../hooks/terms.hook";
import {OptionStep} from "../../../components/offers-create/OptionStep";
import {PaymentStep} from "../../../components/offers-create/PaymentStep";
import {AddressStep} from "../../../components/offers-create/AddressStep";
import {usePayments} from "../../../hooks/payments.hook";


const validate = values => {
  const errors: any = {}
  // if (!values.firstName) {
  //   errors.firstName = 'Required'
  // }
  // if (!values.lastName) {
  //   errors.lastName = 'Required'
  // }
  return errors
}

const CreateOffer = () => {

  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isPrevDisabled, isNextDisabled] = [step === 1, step === 4]

  // terms block
  const {
    terms,
    onAddTerm,
    onChangeTerm: oCT,
    onAddTerminationRule: oATR,
    onDeleteTerminationRule,
    onDeleteTerm
  } = useTerms()

  const {payments, toggleTwoPayments, setTwoPaymentsPriceAffect, toggleStartOptions} = usePayments()

  // options block
  const {options, onChangeOption, onAddOption, onRemoveOption} = useOptions()

  const onChangeTerm = index => field => oCT(index, field)
  const onAddTerminationRule = index => oATR(index)

  const onSubmit = async values => {
    const payload = {
      ...values,
      options,
      terms,
      authorId: 'weofkwpfokw',
      payment: payments
    }
    const {data} = await axios.post(`http://ec2-44-200-125-244.compute-1.amazonaws.com:3333/api/offers`, payload)

    router.push(`http://ec2-44-200-125-244.compute-1.amazonaws.com:3000/offers/${data.resourceId}`)
  }

  const {form, handleSubmit, values} = useForm({
    onSubmit,
    validate
  })

  return (
    <Box margin={'30px'}>

      <form onSubmit={handleSubmit}>
        <Container alignContent={'center'}>
          <Button disabled={isPrevDisabled} className={'prev-step'} colorScheme={'orange'}
                  onClick={() => setStep(prevState => --prevState)}>Предыдущий шаг</Button>
          <Button disabled={isNextDisabled} className={'next-step'} colorScheme={'green'}
                  onClick={() => setStep(prevState => ++prevState)}>Следующий шаг</Button>
        </Container>
        {step === 1 && (<TermStep
          terms={terms}
          onAddTerm={onAddTerm}
          onChangeTerm={onChangeTerm}
          onAddTerminationRule={onAddTerminationRule}
          onDeleteTerminationRule={onDeleteTerminationRule}
          onDeleteTerm={onDeleteTerm}
        />)}
        {step === 2 && (
          <OptionStep
            options={options}
            onAddOption={onAddOption}
            onChangeOption={onChangeOption}
            onRemoveOption={onRemoveOption}
          />
        )}
        {step === 3 && (
          <PaymentStep
            payments={payments}
            onChangeStartOption={toggleStartOptions}
            onChangeTwoPaymentsCheckbox={toggleTwoPayments}
            onChangeTwoPaymentsPriceAffect={setTwoPaymentsPriceAffect}
          />)}
        {step === 4 && (
          <>
            <AddressStep form={form}/>
            <Button type={"submit"}>Сохранить</Button>
          </>
        )}
      </form>
    </Box>
  )
}

export default CreateOffer
