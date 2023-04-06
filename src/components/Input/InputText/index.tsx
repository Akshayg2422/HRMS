import React from 'react'
import Input from '../InputDefault'
import { InputProps } from '../../Interface'

function InputText(props: InputProps) {
  return (
    <Input type={'text'} {...props}></Input>
  )
}

export default InputText

