import { BackArrow, Container, Card, CommonTable, NoRecordFound, Primary, ImageView, Sort, Secondary, Modal, Pagination } from '@components';
import { getDisplayDateTimeFromMoment, getMomentObjFromServer, goTo, INITIAL_PAGE, ROUTE, showToast, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    createBroadcastMessage,
    getBroadcastMessage
} from "../../../../src/store/notifications/actions";
import { Icons } from '@assets';

function BroadCast() {
    const navigation = useNav();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [leaveTypes, setLeaveTypes] = useState('')
    const [type, setType] = useState<string>("all");
    const [activeSort, setActiveSort] = useState<number>(0);
    const [deleteModel, setDeleteModel] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('')


    const { broadcastMessagesData, currentPage, numOfPages } = useSelector(
        (state: any) => state.NotificationReducer
    );

    const sortData = [
        { id: 1, title: "All" },
        { id: 2, title: "By me" },
    ];

    useEffect(() => {
        getBroadcastMessagesList(INITIAL_PAGE)
    }, [])


    const getBroadcastMessagesList = (pageNumber: number) => {

        const params = {
            ...(type === "by me" && { type: 'self' }),
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

    const addOnClick = () => {
        goTo(navigation, ROUTE.ROUTE_MANAGE_BROADCAST);
    };

    const deleteRecord = (id: any) => {

        const params = {
            ...(id && { id: id }),
            ...(id && { is_deleted: true })
        };
        dispatch(createBroadcastMessage({
            params,
            onSuccess: (success: any) => () => {
                showToast("success", success.status)
                setDeleteModel(!deleteModel)
                getBroadcastMessagesList(currentPage)
            },
            onError: (error: string) => () => {
                showToast("error", error)
            },
        }));
    }

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
            <Container additionClass={"mt-2"}>
                <Card additionClass='mx-3'>
                    <Container additionClass='row'>
                        <Container additionClass={'col'}>
                            <Sort
                                sortData={sortData}
                                activeIndex={activeSort || 0}
                                onClick={(index: any) => {
                                    setType(sortData[index].title.toLocaleLowerCase())
                                    setActiveSort(index);
                                    getBroadcastMessagesList(INITIAL_PAGE)
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
                                    <Container additionClass={"d-flex justify-content-between"} >
                                        <Container>
                                            <div className="h2">
                                                {el.title}
                                            </div>
                                        </Container>
                                        <Container additionClass='d-flex justify-content-between'>
                                            <Container additionClass='text-right'>
                                                <span className='h6'>
                                                    {'Posted at'}
                                                </span>
                                                <br />
                                                <span className='h5  mt--2'>
                                                    {getDisplayDateTimeFromMoment(
                                                        getMomentObjFromServer(el.created_at)
                                                    )}
                                                </span>
                                            </Container>
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
                    {broadcastMessagesData?.length > 0 && (
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
                                deleteRecord(selectedItemId)

                            }}
                        />
                    </Container>
                </Container>
            </Modal>
        </>
    )
}

export { BroadCast }
