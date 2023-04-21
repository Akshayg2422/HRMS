
import React from 'react'
import { ContainerProps } from '../../Interface'
import { isExist } from '@utils'

interface PrimaryProps extends ContainerProps {
  text: string,
  onClick?: any
  variant?: 'btn-default' | 'btn-primary' | 'btn-secondary' | 'btn-info' | 'btn-success' | 'btn-danger' | 'btn-warning'
  size?: 'btn-lg' | 'btn-sm' | 'btn-md'
  disabled?: boolean
}



function Primary({ text, variant, size, col, onClick, additionClass, disabled = false }: PrimaryProps) {
  return (
    <button className={`btn ${variant || 'btn-primary'} ${size || 'btn-md'} ${isExist(col)} ${isExist(additionClass)} `} type="button" onClick={onClick} disabled={disabled}>{text}</button>
  )
}

export default Primary;