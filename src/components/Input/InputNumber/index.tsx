import React from 'react'
import Input from '../InputDefault'
import {InputProps} from '../../Interface'

function InputNumber(props: InputProps) {
  return (
    <Input type={'number'}  {...props}></Input>
  )
}

export default InputNumber

