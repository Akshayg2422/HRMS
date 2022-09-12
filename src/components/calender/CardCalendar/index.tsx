import React from 'react'
import {Card, Calender, CardHeading} from '@components'

interface CardCalenderProps {
  title?: string;
}

function index({title}: CardCalenderProps) {
  return (
    <Card>
      {title && <CardHeading title={title} />}
      <Calender />
    </Card>
  )
}

export default index