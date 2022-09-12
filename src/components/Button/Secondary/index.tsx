
import React from 'react'
import {isExist} from '@utils'
import {ContainerProps} from '../../Interface'

interface SecondaryProps extends ContainerProps {
  text: string,
  onClick?: () => void
  variant?: 'btn-outline-default' | 'btn-outline-primary' | 'btn-outline-secondary' | 'btn-outline-info' | 'btn-outline-success' | 'btn-outline-danger' | 'btn-outline-warning'
  size?: 'btn-lg' | 'btn-sm' | 'btn-md'
  additionClass?:string
}

function Secondary({text, variant, size, col, additionClass,onClick}: SecondaryProps) {
  return (
    <button type="button" className={`btn ${variant || 'btn-outline-default'} ${additionClass} ${size || 'btn-md'} ${isExist(col)} font-weight-bold`} onClick={onClick}>{text}</button>
  )
}

export default Secondary