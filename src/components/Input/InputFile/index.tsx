import React from 'react'
import Input from '../InputDefault'
import {InputProps} from '../../Interface'

function InputFile(props: InputProps) {
  return (
    <Input type={'file'} {...props}></Input>
  )
}

export default InputFile

