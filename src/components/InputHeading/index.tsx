import React from 'react'

interface HeadingProps {
  heading?: string;
  classname?: string;
}
function index({ heading, classname }: HeadingProps) {
  return (
    <>
      {heading && <small className={`${classname} form-control-label`}>
        {heading}
      </small>}
    </>
  )
}

export default index