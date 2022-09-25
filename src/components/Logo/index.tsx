import React from 'react'
import {Icons} from '@assets'


interface LogoProps  {
  additionClass?:string
}

export default function Logo({additionClass}: LogoProps) {
  return (
    <img src={Icons.NewLogo} alt={'Logo'} height={45} width={90} className={additionClass} />
  )
}
