import { BackArrow, Container, Card, CommonTable, NoRecordFound, Primary, ImageView, Sort, Secondary, Modal } from '@components';
import { getDisplayDateTimeFromMoment, getMomentObjFromServer, goTo, ROUTE, showToast, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createBroadcastMessage, getBroadcastMessage } from '../../../../../src/store/notifications/actions';
import { Icons } from '@assets';

function Notification() {
    const navigation = useNav();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [leaveTypes, setLeaveTypes] = useState('')
    const [type, setType] = useState<string>("all");
    const [activeSort, setActiveSort] = useState<number>(0);
    const [deleteModel, setDeleteModel] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('')

    

    const { broadcastMessagesData } = useSelector(
        (state: any) => state.NotificationReducer
    );
    console.log("broadcastMessagesData",broadcastMessagesData);


    useEffect(() => {
        getBroadcastMessagesList()
    }, [])


    const getBroadcastMessagesList = () => {

        const params = {
            ...(type === "by me" && { type: 'self' }),

        };
        dispatch(getBroadcastMessage({
            params,
            onSuccess: (success: any) => {
              
            },
            onError: (error: string) => {
                showToast("error", error)
            },
        }));
    };


    return (
        <>
            {/* <Container additionClass={"mt-2"}> */}
        
            <BackArrow additionClass='ml-3 mb-3'/>
            <Container additionClass={" mx-1"}>
                {broadcastMessagesData && broadcastMessagesData?.length > 0 ? broadcastMessagesData?.map((el: any) => {
                    return (
                        <Container additionClass={"col"}>
                            <Card>
                                <Container additionClass={"d-flex justify-content-between"} >
                                    <Container>
                                        <div className="h1">
                                            {el.title}
                                        </div>
                                    </Container>
                                    <Container additionClass='d-flex justify-content-between'>
                                        <Container>
                                            <span className='h6 float-right'>
                                                {'Posted at'}
                                            </span>
                                            <br />
                                            <span className='h5 float-right mt--2'>
                                                {getDisplayDateTimeFromMoment(
                                                    getMomentObjFromServer(el.created_at)
                                                )}
                                            </span>
                                        </Container>
                                        <Container>
                                            {type === "by me" && (
                                                <ImageView icon={Icons.DeleteSecondary} additionClass={'ml-1'} height={20} onClick={() => {
                                                    setDeleteModel(!deleteModel)
                                                    setSelectedItemId(el.id)
                                                }} />
                                            )}
                                        </Container>
                                    </Container>
                                </Container>
                                <Container additionClass={'h4 fw-normal'}>
                                    {el.message}
                                </Container>
                                <Container additionClass={'text-right'}>
                                    <div className='h6 mb--1'>
                                        {'Posted by'}
                                    </div>
                                    <div className='h5 mb--1'>
                                        {el.created_by}
                                    </div>
                                </Container>
                            </Card>
                        </Container>
                    );
                }) : <NoRecordFound />}
            </Container>
        </>
    )
}

export { Notification }
