import React from 'react';

type NoRecordsFoundProps = {
  text?: string
}

const NoRecordsFound = ({text = 'No Record Found'}: NoRecordsFoundProps) => (
  <div className="text-muted text-center p-5"><small>{text}</small></div>
)

export default NoRecordsFound;