import React from 'react'
import { ImageView } from '@components'
import { Icons } from '@assets'
import { Button } from 'reactstrap'

interface SearchProps {
  backgroundColor?: string
  variant: 'Button' | 'Icon'
  additionalClassName?: string
  size?: 'lg' | 'sm' | 'md'
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  icons?: any
}

function index({ backgroundColor = 'primary', variant = 'Button', additionalClassName, onClick, size = 'md', icons }: SearchProps) {
  return (
    <>
      {variant === 'Button' &&
        <Button type='button' size={size} color={backgroundColor} className={`btn-icon btn-2  ${additionalClassName}`} onClick={onClick} >
          {/* <span className='btn-inner--icon'><ImageView icon={icons ? icons : Icons.Search} /></span> */}
          <span className='btn-inner--icon'>{'Search'}</span>
        </Button >
      }
      {variant === 'Icon' && <span className={`${additionalClassName}`}><ImageView additionClass='p-2' height={40} width={40} icon={Icons.SearchSecondary} style={{ cursor: 'pointer' }} onClick={onClick} /></span>}
    </>
  )
}

export default index
