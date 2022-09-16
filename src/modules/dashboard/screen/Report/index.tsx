import React from 'react'
import {Header, Navbar} from '../../container'
import {Card, Container, DropDown, DateRangePicker, Icon, Table} from '@components'
import {Icons} from '@assets'
import {TABLE_CONTENT_TYPE_REPORT} from '@utils';

const sampleData = [{id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai'}, {id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai'}, {id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai'}, {id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai'}, {id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai'}, {id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai'}, {id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai'}, {id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai'}, {id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai'}, {id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai'}]

function index() {
  return (
    <>
      <Card margin={'m-5'}>
        <Container flexDirection={'row'} alignItems={'align-items-center'}>
          <Container flexDirection={'row'} col={'col-9'} alignItems={'align-items-center'}>
            <DropDown additionClass={'col-lg-3 col-md-12'} placeholder={'Select Report'} label={'Report'} data={[{ id: '1', name: 'Leave Report', value: 'Leave' }]} />
            <DropDown additionClass={'col-lg-3 col-md-12'} placeholder={'Select Report'} label={'Branch'} data={[{ id: '1', name: 'Leave Report', value: 'Leave' }]} />
            <DropDown additionClass={'col-lg-3 col-md-12'} placeholder={'Select Department'} label={'Department'} data={[{ id: '1', name: 'Department', value: 'Leave' }]} />
            <DropDown additionClass={'col-lg-3 col-md-12'} placeholder={'Select Employee'} label={'Employee'} data={[{ id: '1', name: 'Department', value: 'Leave' }]} />
          </Container>

          <Container additionClass={'col-lg-3'} flexDirection={'row'} justifyContent={'justify-content-center'} alignItems={'align-items-center'}>
            <Icon type={'btn-primary'} icon={Icons.Search} />
          </Container>


        </Container>

        <Container flexDirection={'row'} alignItems={'align-items-center'} col={'col-9'}>
          <Container additionClass={'col-lg-4 col-md-12'}>
            <DateRangePicker title={'Date Range'} iconPosition={'append'} />
          </Container>
          <Container col={'col-auto'} flexDirection={'flex-row'} alignItems={'align-items-center'} margin={'mt-2'} additionClass={'ml-2'} >
            <Icon type={'btn-outline-primary'} text={'Copy'} />
            <Icon type={'btn-outline-primary'} icon={Icons.Download} />
          </Container>



        </Container>

        <Table displayDataSet={sampleData} tableContentType={TABLE_CONTENT_TYPE_REPORT} />
      </Card>
    </>
  )
}

export default index