
import React from 'react'
import {ContainerProps} from '../../Interface'
import {isExist} from '@utils'

interface PrimaryProps extends ContainerProps {
  text: string,
  onClick?: () => void
  variant?: 'btn-default' | 'btn-primary' | 'btn-secondary' | 'btn-info' | 'btn-success' | 'btn-danger' | 'btn-warning'
  size?: 'btn-lg' | 'btn-sm' | 'btn-md'
}



function Primary({text, variant, size, col, onClick, additionClass}: PrimaryProps) {
  return (
    <button className={`btn ${variant || 'btn-primary'} ${size || 'btn-md'} ${isExist(col)} ${isExist(additionClass)}`} type="button" onClick={onClick}>{text}</button>
  )
}

export default Primary;