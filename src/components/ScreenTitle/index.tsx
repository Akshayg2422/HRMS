
import React from 'react'

type ScreenTitleProps = {
  title: string;
  additionclass?:string;
}

function ScreenTitle({title,additionclass}: ScreenTitleProps) {
  return (
    <h2 className={`ct-title ${additionclass}`} >{title}</h2>
  )
}

export default ScreenTitle;