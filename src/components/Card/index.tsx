import React from 'react'
import {ContainerProps} from '../Interface'
import {isExist} from '@utils'


interface CardProps extends ContainerProps {
  backgroundColor?: 'bg-z-gray' | 'bg-default' | 'bg-primary',
  children: React.ReactNode
  style?: any;
  cardPadding?: string;

}



function Card({additionClass, backgroundColor,cardPadding, children, justifyContent, alignItems, col, height, width, margin, padding, display, flexDirection, style, onClick}: CardProps) {
  return (
    <div className={`card  ${isExist(additionClass)} ${isExist(col)} ${isExist(backgroundColor) || 'bg-white'} ${isExist(justifyContent)} ${isExist(alignItems)} ${isExist(height)} ${isExist(width)} ${isExist(display)} ${isExist(margin)} ${isExist(padding)} ${isExist(flexDirection)}`} style={style} onClick={onClick}>
      <div className={`card-body  ${isExist(cardPadding)}`}>
        {
          children
        }
      </div>
    </div>
  )
}

export default Card;