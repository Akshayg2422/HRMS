import { BackArrow, Container, Card, CommonTable, NoRecordFound, Primary, ImageView, Sort, Secondary, Modal, Pagination } from '@components';
import { getDisplayDateTimeFromMoment, getMomentObjFromServer, goTo, ROUTE, showToast, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    createBroadcastMessage,
    getBroadcastMessage
} from "../../../../../src/store/notifications/actions";
import { Icons } from '@assets';

function Notification() {
    const navigation = useNav();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const [type, setType] = useState<string>("all");
    const [activeSort, setActiveSort] = useState<number>(0);
    const [deleteModel, setDeleteModel] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('')


    const { broadcastMessagesData, currentPage, numOfPages } = useSelector(
        (state: any) => state.NotificationReducer
    );


    useEffect(() => {
        getBroadcastMessagesList(currentPage)
    }, [])


    const getBroadcastMessagesList = (pageNumber: number) => {

        const params = {
            page_number: pageNumber,
        };
        dispatch(getBroadcastMessage({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: string) => () => {
                showToast("error", error)
            },
        }));
    };

    function paginationHandler(
        type: "next" | "prev" | "current",
        position?: number
    ) {
        let page =
            type === "next"
                ? currentPage + 1
                : type === "prev"
                    ? currentPage - 1
                    : position;
        getBroadcastMessagesList(page);
    }

    return (
        <>
            <Container additionClass={" mx-1"}>
                {broadcastMessagesData && broadcastMessagesData?.length > 0 ? broadcastMessagesData?.map((el: any) => {

                    return (
                        <Container additionClass={"col"}>
                            <Card>
                                <Container additionClass={"d-flex justify-content-between"} >
                                    <Container>
                                        <div className="h2">
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
                                        {/* <Container>
                                                {type === "by me" && (
                                                    <ImageView icon={Icons.DeleteSecondary} additionClass={'ml-1'} height={20} onClick={() => {
                                                        setDeleteModel(!deleteModel)
                                                        setSelectedItemId(el.id)
                                                    }} />
                                                )}
                                            </Container> */}
                                    </Container>
                                </Container>
                                <Container additionClass={'h4 fw-normal'}>
                                    {el.message}
                                </Container>
                                <Container additionClass={'text-right'}>
                                    {type !== "by me" && (<><div className='h6 mb--1'>
                                        {'Posted by'}
                                    </div>
                                        <div className='h5 mb--1'>
                                            {el.created_by}
                                        </div></>)}
                                    {type === "by me" && (
                                        <ImageView icon={Icons.DeleteSecondary} additionClass={'ml-1'} height={20} onClick={() => {
                                            setDeleteModel(!deleteModel)
                                            setSelectedItemId(el.id)
                                        }} />
                                    )}
                                </Container>
                            </Card>
                        </Container>
                    );
                }) : <NoRecordFound />}
                {broadcastMessagesData && broadcastMessagesData.length > 0 && (
                    <Pagination currentPage={currentPage}
                        // additionalClass={'card-footer'}
                        noOfPage={numOfPages}
                        totalPages={numOfPages}
                        paginationNumberClick={(currentPage: number | undefined) => {
                            paginationHandler("current", currentPage);
                        }}
                        previousClick={() => paginationHandler("prev")}
                        nextClick={() => paginationHandler("next")}
                    />
                )}
            </Container>

        </>
    )
}

export { Notification }
