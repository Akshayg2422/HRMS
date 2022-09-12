import React from 'react'

interface CardHeadingProps {
  title: string;
  children?: React.ReactNode
}

function index({title,children}: CardHeadingProps) {
  return (
    <div className="card-header border-0">
      <div className="row align-items-center">
        <div className="col d-flex flex-row justify-content-between">
          <h3 className="mb-0" >{title}</h3>
          <div>
            {
              children
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default index