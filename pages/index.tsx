import React, { useState, useRef, useEffect } from 'react'
import {
  styled,
  Grid,
  getMediaQueryFromTheme,
  Form,
  FormRef,
  TextInput,
  Button,
  ThemeProvider, newskitLightTheme
} from 'newskit'

import 'react-phone-number-input/style.css'
//@ts-ignore
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'
//@ts-ignore
import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver, useForm } from 'react-hook-form'
import * as yup from 'yup'
import 'yup-phone'

const StyledGrid = styled(Grid)`
  padding-bottom: 224px;
  ${getMediaQueryFromTheme('sm')} {
    padding-bottom: 0;
  }
`
const Caption = styled.text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #0a0a0a;
`

const Phone: React.FC = ({name}) => {

  const [inputValue, setInputValue] = useState('+44 555 555')
  // const { control } = useForm()
  const formRef = useRef<FormRef>(null)
  const schema = yup.object({
    landline: yup.string(),
    text: yup.string()
  })
  const resolver: Resolver = yupResolver(schema)

  const onSubmitPhone = async (e: { [x: string]: any }) => {
    console.log(e)
  }

  const css = `
    .PhoneInput{
      margin-bottom: 68px
    }
    .PhoneInputInput{
      width: 336px;
      height: 48px;
      border: 1px solid #E4E4E4;
    }
    .PhoneInputCountry{
      background: #FAFAFA;
      padding: 10px;
      margin: 0px
    } 
  `

  console.log(formRef)
  console.log(formRef.current)
  return (
    <ThemeProvider theme={newskitLightTheme}>
    <StyledGrid
      xsMargin="space000"
      xsColumnGutter="space000"
      xsRowGutter="space000"
    >
      <h1>{name}</h1>
      <br></br>
      <style>{css}</style>
      <Form
        onSubmit={onSubmitPhone}
        reValidationMode="onBlur"
        resolver={resolver}
        ref={formRef}
      >
        <Caption>{'Mobile Phone number'}</Caption>

        <PhoneInputWithCountry
            defaultCountry="GB"
            control={formRef.current?.control}
            international={true}
            value={inputValue}
            name={'landline'}
            onChange={setInputValue}
            placeholder="Enter phone number"
          />

        {/* <TextInput name="text" type="text" label={'Name'}></TextInput> */}
        <Button type={'submit'}>{'Submit'}</Button>
      </Form>
    </StyledGrid>
    </ThemeProvider>
  )
}

export default Phone

export async function getServerSideProps(context) {
  return {
    props: {name: 'test'}, // will be passed to the page component as props
  }
}