import React from 'react'
import {Input, Container} from '@components'


interface OTPprops {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string | undefined;
  value?: string | number | undefined;
  ref?:any
  formCustomClass?:string
}


function OtpInput({onChange,name,value,ref,formCustomClass}:OTPprops) {
  return (
    <Container  additionClass={formCustomClass} style={{width: '70px'}} textColor='text-dark'>
      <Input maxLength={1} type={'number'} autoFocus={true} padding={'p-3'}  onChange={onChange} name={name} value={value} ref={ref}/>
     </Container>


  )
}

export default OtpInput