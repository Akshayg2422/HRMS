import { Table } from '@components'
import { TABLE_CONTENT_TYPE_REPORT } from '@utils'
import React from 'react'

function LogReports() {
    const sampleData = [{ id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }]

    return (
        <div>
            <Table displayDataSet={sampleData} tableContentType={TABLE_CONTENT_TYPE_REPORT} />

        </div>
    )
}

export default LogReports
