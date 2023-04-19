import React from 'react'
import { ImageView } from '@components'
import { Icons } from '@assets'

interface ButtonIconProps {
  backgroundColor?: string
  icon?: any
  text?: string;
  type?: 'btn-outline-primary' | 'btn-primary'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  ImageClass?: string
  additionClass?: string
  height?: number
  width?: number
}

function index({ backgroundColor, icon, text, ImageClass, type = 'btn-primary', onClick, additionClass, height = 30, width = 30 }: ButtonIconProps) {
  return (
    <button type='button' className={`btn ${type}  btn-icon-only ${backgroundColor}  ${additionClass}`} onClick={onClick}>
      <span className='btn-inner--icon'>
        {
          icon && <ImageView additionClass={ImageClass} icon={icon} height={height} width={width} />
        }
        {
          text &&
          <span className={'text-center  mb-0'}>{text}</span>
        }
      </span>
    </button >
  )
}

export default index
