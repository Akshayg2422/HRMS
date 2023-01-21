import { Card, Container, ImageView } from '@components';
import { goTo, ROUTE, useNav } from '@utils';
import React from 'react'
import { useDispatch } from 'react-redux';

function Notifications() {
    const dispatch = useDispatch()
    const navigate = useNav();

    const NOTIFICATION_ITEMS = [{ id: '1', name: 'Leave Request', value: 'LR', image: "", route: '' },
    { id: '2', name: 'Attendance Request', value: 'AR', image: "", route: '' },
    { id: '3', name: 'Face re-Register', value: 'FR', image: "", route: '' },
    { id: '4', name: 'Shift Change', value: 'SC', image: "", route: '' }]

    const currentNav = (it: any, index: any) => {
        navigate(ROUTE.ROUTE_MANAGE_REQUEST);
        // goTo(navigate, ROUTE.ROUTE_MANAGE_REQUEST)}
    };

    return (
        <Container flexDirection={"row"} margin={"mt-3"}>
            {NOTIFICATION_ITEMS.map((it, index) => {
                return (
                    <>
                         <Container additionClass={"col-xl-3 col-md-6"}>
                            <Card
                                additionClass={"border"}
                                style={{ border: "1px bg-gray" }}
                                onClick={() => currentNav(it, index)}
                            >
                                <Container
                                    additionClass={"row py-3"}
                                    justifyContent={"justify-content-center"}
                                >
                                    {/* <Container col={"col-auto"} alignItems={"align-items-center"}>
                                        <ImageView additionClass={'m-0'} icon={it?.image} alt={it.name} height={50} width={50} />
                                    </Container> */}
                                    <div className="col">
                                        <h5 className="text-black h3 mb-0 mt-2 font-weight-bold">
                                            {it.name}
                                        </h5>
                                    </div>
                                </Container>
                            </Card>
                        </Container>
                    </>
                );
            })}
        </Container >
    )
}

export { Notifications }
