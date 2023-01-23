import { Card, Divider } from '@components'
import React from 'react'
import { Badge } from 'react-bootstrap'

function Notification() {

    const NOTIFICATION_ITEMS = [{ name: 'Puma', type: 'LeaveRequest', description: "Let's meet at Starbucks at 11:30. Wdyt?" },
    { name: 'Iniyan', type: 'Shift Request', description: "Let's meet at Starbucks at 11:30. Wdyt?" },
    { name: 'Jai', type: 'Face re-Register', description: "Let's meet at Starbucks at 11:30. Wdyt?" },
    { name: 'Jai', type: 'Face re-Register', description: "Let's meet at Starbucks at 11:30. Wdyt?" }]

    return (
        <div className='mr-xl-3 ml-sm-0 ml-3'>
            <li className="nav-item dropdown show  ">
                <a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="false" aria-expanded="true">
                    <i className="ni ni-bell-55 text-white"></i>
                    <span className="badge badge-sm badge-circle badge-floating badge-danger border-white top-0 mt-1 start-100 translate-middle p--2">{NOTIFICATION_ITEMS.length}</span>
                </a>
                <div className="dropdown-menu dropdown-menu-xl dropdown-menu-right py-0 overflow-hidden ">
                    <div className="px-3 py-3">
                        <h6 className="text-sm text-muted m-0">You have <strong className="text-primary">{NOTIFICATION_ITEMS.length}</strong> notifications.</h6>
                    </div>
                    <div className="list-group list-group-flush">
                        <a href="#!" className="">
                            {NOTIFICATION_ITEMS.map((item: any) => {
                                return (
                                    <Card additionClass="row align-items-center m-0">
                                        <div className="col ml-2">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h4 className="mb-0 text-sm">{item.name}</h4>
                                                </div>
                                                <div className="text-right text-muted">
                                                    <small>2 hrs ago</small>
                                                </div>
                                            </div>
                                            {/* <h5 className="mb-0 text-sm fw-normal">{item.type}</h5> */}
                                            <h5 className="fw-normal text-black mb-0">Let's meet at Starbucks at 11:30. Wdyt?</h5>
                                        </div>
                                        {/* <Divider /> */}
                                    </Card>
                                )
                            })}
                        </a>
                    </div>
                    {/* <a href="#!" className="dropdown-item text-center text-primary font-weight-bold py-3">View all</a> */}
                </div>
            </li>
        </div>
    )
}

export { Notification }
