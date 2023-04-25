import { Card, CommonDropdownMenu, Container, Divider, ImageView, ScreenContainer } from '@components'
import { Icons } from '@assets'
import React from 'react'
import { Col, Row } from 'reactstrap'

const Payslip = () => {

    const CARD_DROPDOWN_ITEM = [
        { id: '1', name: 'Download Payslip', value: 'DL', icon: 'ni ni-cloud-download-95' },
    ]

    return (
        <ScreenContainer>
            <Card additionClass='m-0'>
                <Container>
                    <Container additionClass={'d-flex justify-content-end'}>
                        <CommonDropdownMenu data={CARD_DROPDOWN_ITEM}
                            onItemClick={(e, item) => {
                                e.stopPropagation();
                            }} />
                    </Container>
                    <div className="header-body text-center mb-7">
                        <Row className="justify-content-center d-flex">
                            <Col>
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="avatar avatar-xl rounded-circle"
                                                src={'https://picsum.photos/id/237/200/300'}
                                            />
                                        </a>
                                    </Col>
                                </Row>
                                <h1 className="">{'Abcd infotech private limited'}</h1>
                                <p className="text-lead">{'No.17/1, Prithivi Nagar, GNT road, Gummidipoondi - 601201'}</p>
                                <h3>{'Salary Slip for the month of March/2023'}</h3>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Container additionClass='row'>
                    <Container additionClass='col-xl-7'>
                        <h4>{'Ref No. :'}</h4>
                        <h4>{'Pay Days :'}</h4>
                    </Container>
                    <Container additionClass='col-xl-5'>
                        <h4>{'Employee Name :'}</h4>
                        <h4>{'PAN :'}</h4>
                    </Container>
                </Container>
                <Container style={{ overflowX: 'auto' }} additionClass={'scroll-hidden'}>
                    <table className="mt-4 table table-bordered">
                        <thead >
                            <tr>
                                <th scope="col"><h4>{'Earnings'}</h4></th>
                                <th scope="col" ><h4>{'Amount'}</h4></th>
                                <th scope="col" ><h4>{'Deductions'}</h4></th>
                                <th scope="col" ><h4>{'Deductions'}</h4></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Basic</th>
                                <td>16250.00</td>
                                <th>PF</th>
                                <td>1800.00</td>
                            </tr>
                            <tr>
                                <th scope="row">DA</th>
                                <td>550.00</td>
                                <th>ESI</th>
                                <td>142.00</td>
                            </tr>
                            <tr>
                                <th scope="row">HRA</th>
                                <td>1650.00 </td>
                                {/* <th>TDS</th>
                                <td>0.00</td> */}
                            </tr>
                            <tr className="border-top">
                                <th scope="row"><h5>{'Total Earning'}</h5></th>
                                <td>25970.00</td>
                                <th><h5>{'Total Deductions'}</h5></th>
                                <td>2442.00</td>
                            </tr>
                        </tbody>
                    </table>
                </Container>
                <Container additionClass='mt-5'>
                    <Container>
                        <h4>{'Net Pay'}</h4>
                        <h4>{'In Words'}</h4>
                    </Container>
                    <Container additionClass='float-right mx-xl-7  mx-sm-0 mx-2'>
                        <h4>{'Signature'}</h4>
                    </Container>
                </Container>
            </Card>
        </ScreenContainer>
    )
}

export { Payslip } 
