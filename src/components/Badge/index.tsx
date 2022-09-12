import React from "react";
import {isExist} from '@utils'

type BadgeProps = {
  title: string;
  backgroundColor?: 'badge-secondary' | 'badge-default' | 'badge-primary' | 'badge-danger',
  onClick?: () => void
  style?: any;
  additionClass?: string;
  badgeSize?: 'badge-md' | 'badge-lg'

}

const Badges = ({title, onClick, backgroundColor, style, additionClass, badgeSize}: BadgeProps) => {
  return (
    <>
      <span className={`badge text-capitalize  ${isExist(backgroundColor || 'badge-default')} ${isExist(additionClass)} ${isExist(badgeSize)}`} style={style} onClick={onClick} >{title}</span>
    </>
  )
}
export default Badges