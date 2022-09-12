
import React from 'react'
import {ImageView} from '../../../components'
import {Icons} from '../../../assets'

type SocialMediaProps = {
  icon:  any 
  text: 'Facebook' | 'Google'
  href?: string
  backgroundColor: 'bg-google' | 'bg-facebook'
}

function SocialMedia({icon, text, href, backgroundColor}: SocialMediaProps) {

 
  return (
    <div className="btn-wrapper text-center">
      <a href={href} className={`btn btn-icon ${backgroundColor}`}>
        <ImageView icon={icon}/>
        <span className="btn-inner--text">{text}</span>
      </a>
    </div>
  )
}

export default SocialMedia