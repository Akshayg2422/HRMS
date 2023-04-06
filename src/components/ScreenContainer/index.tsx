import React from 'react'
import {ContainerProps} from '../Interface'
import {isExist} from '@utils'

interface DivProps extends ContainerProps {
  backgroundColor?: 'bg-z-gray' | 'bg-default' | 'bg-primary',
  children?: React.ReactNode
  style?: any;
}



function ScreenContainer({backgroundColor, children, justifyContent, alignItems, col, style, margin, padding, height, width, display, flexDirection, onClick, additionClass, position, }: DivProps) {
  return (
    <div className={`m-4 mb--4 ${isExist(additionClass)} ${isExist(position)} ${isExist(col)}  ${isExist(backgroundColor)} ${isExist(justifyContent)} ${isExist(alignItems)} ${isExist(height)} ${isExist(width)} ${isExist(display)} ${isExist(margin)} ${isExist(padding)} ${isExist(flexDirection)}`} style={style} onClick={onClick}>
      {
        children
      }
    </div>
  )
}

export default ScreenContainer;