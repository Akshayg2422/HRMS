import React from 'react'
import Input from '../InputDefault'
import {InputProps} from '../../Interface'

function InputMail(props: InputProps) {
  return (
    <Input type={'email'} {...props}></Input>
  )
}

export default InputMail

