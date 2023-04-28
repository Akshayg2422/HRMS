import React from 'react'
import Input from '../InputDefault'
import {InputProps} from '../../Interface'

const InputNumber =  React.forwardRef((props: InputProps, ref: any)=> {
  return (
    <Input type={'number'}  {...props} ref={ref}></Input>
  )
})

export default InputNumber