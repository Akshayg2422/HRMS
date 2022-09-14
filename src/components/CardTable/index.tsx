import React from 'react'
import {Card, Table, CardHeading} from '@components'



export interface CardTableProps {
  displayDataSet: Array<{}>;
  title?: string
}
function index({displayDataSet, title}: CardTableProps) {
  return (
    <Card>
      {title &&
        <CardHeading title={title} />
      }
      <Table displayDataSet={displayDataSet} />
    </Card>
  )
}

export default index