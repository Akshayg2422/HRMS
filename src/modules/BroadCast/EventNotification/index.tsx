import { BackArrow, Container, Card, CommonTable, NoRecordFound, Primary, ImageView, Sort, Secondary, Modal } from '@components';
import { getDisplayDateTimeFromMoment, getMomentObjFromServer, goTo, ROUTE, showToast, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    getBroadcastMessage
} from "../../../../src/store/notifications/actions";
import { Icons } from '@assets';

function EventNotification() {
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

    const sortData = [
        { id: 1, title: "All" },
        { id: 2, title: "By me" },
    ];

    useEffect(() => {
        getBroadcastMessagesList()
    }, [])


    const getBroadcastMessagesList = (id?: string) => {

        const params = {
            ...(type === "by me" && { type: 'self' }),
            ...(id && { id: id }),
            ...(id && { is_deleted: true })
        };
        dispatch(getBroadcastMessage({
            params,
            onSuccess: (success: any) => {
                if(id){
                    setDeleteModel(!deleteModel)
                }
                console.log("successsssss", success);
            },
            onError: (error: string) => {
                showToast("error", error)
            },
        }));
    };

    const addOnClick = () => {
        goTo(navigation, ROUTE.ROUTE_MANAGE_BROADCAST);
    };

    return (
        <>
            <Container additionClass={"mt-2"}>
                <Card additionClass='mx-3'>
                    <Container additionClass='row'>
                        <Container additionClass={'col'}>
                            <Sort
                                sortData={sortData}
                                activeIndex={activeSort}
                                onClick={(index: any) => {
                                    setType(sortData[index].title.toLocaleLowerCase())
                                    setActiveSort(index);
                                    getBroadcastMessagesList()
                                }}
                            />
                        </Container>
                        <Container additionClass="text-right col">
                            <Primary
                                additionClass=''
                                text={t('addNew')}
                                onClick={() => addOnClick()}
                            />
                        </Container>
                    </Container>
                </Card>

                <Container additionClass={" mx-1"}>
                    {broadcastMessagesData && broadcastMessagesData?.length > 0 ? broadcastMessagesData?.map((el: any) => {
                        return (
                            <Container additionClass={"col"}>
                                <Card>
                                    <Container additionClass={"row "} >
                                        <div className="h1 col">
                                            {el.title}
                                        </div>

                                        <div className="h4 col text-right">
                                            <div>
                                            </div>
                                            <div className='h6'>
                                                {'Posted at'}
                                            </div>
                                            <div className='h5 mt--2'>
                                                {getDisplayDateTimeFromMoment(
                                                    getMomentObjFromServer(el.created_at)
                                                )}
                                            </div>
                                            {type === "by me" && (
                                                <ImageView icon={Icons.DeleteSecondary} height={25} onClick={() => {
                                                    setDeleteModel(!deleteModel)
                                                    setSelectedItemId(el.id)
                                                }} />
                                            )}
                                        </div>
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
                                    </Container>
                                </Card>
                            </Container>
                        );
                    }) : <NoRecordFound />}
                </Container>
            </Container>
            <Modal
                title={t("deleteMessage")}
                showModel={deleteModel}
                toggle={() => setDeleteModel(!deleteModel)}
            >
                <Container>
                    <span className="ml-3">{t("broadcastWarningMessage")}</span>
                    <Container
                        margin={"m-5"}
                        justifyContent={"justify-content-end"}
                        display={"d-flex"}
                    >
                        <Secondary
                            text={t("cancel")}
                            onClick={() => setDeleteModel(!deleteModel)}
                        />
                        <Primary
                            text={t("proceed")}
                            onClick={() => {
                                getBroadcastMessagesList(selectedItemId)

                            }}
                        />
                    </Container>
                </Container>
            </Modal>
        </>
    )
}

export { EventNotification }
