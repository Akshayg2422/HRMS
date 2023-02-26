import React from 'react'
import { Input, Container } from '@components'
import { KeyboardEventHandler, KeyboardEvent } from 'react'

interface OTPprops {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string | undefined;
  value?: string | number | undefined;
  ref?: any
  formCustomClass?: string
  textColor?: string
}


const OtpInput = React.forwardRef(({ onChange, name, value, formCustomClass }: OTPprops, ref) => {
  return (
    <Container additionClass={formCustomClass} style={{ width: '70px' }} textColor='text-dark'>
      <Input maxLength={1} textColor='text-primary' type={'number'} autoFocus={true} padding={'p-3'} onChange={onChange} name={name} value={value} ref={ref} />
    </Container>
  )
});

export default OtpInput