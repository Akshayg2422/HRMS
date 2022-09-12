import React from 'react'
import {Icons} from '@assets'


interface LogoProps  {
  additionClass?:string
}

export default function Logo({additionClass}: LogoProps) {
  return (
    <img src={Icons.Logo} alt={'Logo'} className={additionClass} />
  )
}
