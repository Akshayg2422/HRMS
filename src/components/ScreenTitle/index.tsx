
import React from 'react'

type ScreenTitleProps = {
  title: string;
  additionclass?:string;
}

function ScreenTitle({title,additionclass}: ScreenTitleProps) {
  return (
    <h1 className={`ct-title ${additionclass}`} >{title}</h1>
  )
}

export default ScreenTitle;