import React from 'react'
import { ImageView } from '@components'
import { Icons } from '@assets'

interface SearchProps {
  backgroundColor?: string
  variant: 'Button' | 'Icon'
  additionalClassName?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

function index({ backgroundColor, variant = 'Button', additionalClassName, onClick }: SearchProps) {
  return (
    <>
      {variant === 'Button' && <button type='button' className={`btn btn-icon-only ${backgroundColor || 'bg-primary'} ${additionalClassName}`} onClick={onClick} >
        <span className='btn-inner--icon'><ImageView icon={Icons.Search} /></span>
      </button >}
      {variant === 'Icon' && <span className={`${additionalClassName}`}><ImageView additionClass='p-2' height={45} width={45} icon={Icons.SearchSecondary} style={{ cursor: 'pointer' }} onClick={onClick} /></span>}
    </>
  )
}

export default index
