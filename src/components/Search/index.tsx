import React from 'react'
import {ImageView} from '@components'
import {Icons} from '@assets'

interface SearchProps {
  backgroundColor?: string
}

function index({backgroundColor}: SearchProps) {
  return (
    <button type='button' className={`btn btn-icon-only ${backgroundColor || 'bg-primary'}`} >
      <span className='btn-inner--icon'><ImageView icon={Icons.Search} /></span>
    </button >
  )
}

export default index
