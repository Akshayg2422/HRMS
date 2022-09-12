import React from 'react'
import {ImageView} from '@components'
import {Icons} from '@assets'

interface ButtonIconProps {
  backgroundColor?: string
  icon?: any
  text?: string;
  type: 'btn-outline-primary' | 'btn-primary'
}

function index({backgroundColor, icon, text, type}: ButtonIconProps) {
  return (
    <button type='button' className={`btn ${type}  btn-icon-only ${backgroundColor}  align-items-center`} >
      <span className='btn-inner--icon'>
        {
          icon && <ImageView icon={icon} />
        }
        {
          text &&
          <span className={'text-center mb-0'}>{text}</span>
        }
      </span>
    </button >
  )
}

export default index
