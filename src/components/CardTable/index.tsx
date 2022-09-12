import React from 'react'
import {Card, Table, CardHeading} from '@components'



export interface CardTableProps {
  tableDataSet: Array<{}>;
  title?: string
}
function index({tableDataSet, title}: CardTableProps) {
  return (
    <Card>
      {title &&
        <CardHeading title={title} />
      }
      <Table tableDataSet={tableDataSet} />
    </Card>
  )
}

export default index