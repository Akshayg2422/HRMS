import React from 'react'

interface HeadingProps {
  heading?: string;
}
function index({heading}: HeadingProps) {
  return (
    <>
      {heading && <small className="form-control-label">
        {heading}
      </small>}
    </>
  )
}

export default index