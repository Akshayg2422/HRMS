import { BackArrow, Card, CommonTable, Container, DropDown, InputText, Modal, NoRecordFound, Primary, Secondary } from '@components'
import { getBranchShifts, getBranchWeeklyShifts, getShiftRequestedStatus, postRequestShiftChange } from '../../../../store/shiftManagement/actions';
import { dropDownValueCheck, dropDownValueCheckByEvent, getRequestType, LEAVES_TYPE, REQUEST_TYPE, REQUEST_TYPE_SUBSET, showToast, useNav, validateDefault } from '@utils'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function EmployeeShiftRequest() {
    const navigation = useNav();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const { requestList, currentPage, numOfPages, branchShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );
    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const [requestTypes, setRequestTypes] = useState(REQUEST_TYPE_SUBSET[0].name);
    const [changeShiftModel, setChangeShiftModel] = useState(false)
    const [requestDetails, setRequestDetails] = useState({
        shiftId: '',
        reason: ''
    })


    useEffect(() => {
        getBranchShiftsList()
    }, [])

    useEffect(() => {
        getRequestList(getRequestType(requestTypes), currentPage);
    }, [requestTypes])


    const typeValidation = () => {
        if (!requestTypes) {
            showToast("error", t("invalidType"));
            return false;
        }
        return true
    }

    const getRequestList = (type: any, pageNumber: number) => {
        if (typeValidation()) {
            const params = {
                status: type,
                page_number: pageNumber,
            }
            dispatch(getShiftRequestedStatus({ params }));
        }
    }

    const getBranchShiftsList = () => {
        const params = { branch_id: dashboardDetails?.company_branch?.id }
        dispatch(getBranchShifts({ params }));
    }

    const normalizedRequestList = (data: any) => {
        return (
            data &&
            data.length > 0 &&
            data.map((el: any) => {
                return {
                    name: `${el?.name}${' '}(${el.employee_id})`,
                    "Branch": el.branch_name,
                    "Shift": el.shift_details.name,
                    "Status": el.status_text
                };
            })
        );
    };

    console.log("dashboardDetails",dashboardDetails);
    

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
        getRequestList(getRequestType(requestTypes), page);
    }

    const onChangeHandler = (event: any) => {
        setRequestDetails({ ...requestDetails, [event.target.name]: event.target.value });
    };

    const onValidationParams = () => {
        if (!validateDefault(requestDetails.reason).status) {
            showToast("error", t("invalidReason"));
            return false;
        } else if (!requestDetails.shiftId) {
            showToast("error", t("invalidShiftId"));
            return false;
        }
        return true
    }

    const onRequestHandler = () => {
        if (onValidationParams()) {
            const params = {
                reason: requestDetails.reason,
                request_shift_id: requestDetails.shiftId
            }
            dispatch(
                postRequestShiftChange({
                    params,
                    onSuccess: (success: any) => {
                        showToast('success', success)
                        setChangeShiftModel(!changeShiftModel)
                        getRequestList(getRequestType(requestTypes), currentPage);
                    },
                    onError: (error: string) => {
                        showToast('error', error)
                    },
                })
            );
        }
    }


    return (
        <div>
            <Container additionClass={"mt-5 main-contain"}>
                <Card>
                    <BackArrow />
                    <h2 className='mt-3'>{t("shiftRequest")}</h2>
                    <Container additionClass={"text-right row mt-3"}>
                        <Container additionClass="col-xl-4">
                            <DropDown
                                data={REQUEST_TYPE_SUBSET}
                                value={requestTypes}
                                placeholder={"Select Type"}
                                onChange={(event) => {
                                    setRequestTypes(dropDownValueCheck(event.target.value, "Select Type"))
                                }}
                            />
                        </Container>
                        <Container additionClass="col">
                            <Primary
                                text={t("changeShift")}
                                onClick={() => setChangeShiftModel(!changeShiftModel)}
                                col={"col-xl-3"}
                                size={"btn-md"}
                            />
                        </Container>
                    </Container>
                </Card>
                <Card>
                    <h2>{t("requestList")}</h2>
                    {requestList && requestList?.length > 0 ? (
                        <CommonTable
                            noHeader
                            isPagination
                            currentPage={currentPage}
                            noOfPage={numOfPages}
                            paginationNumberClick={(currentPage) => {
                                paginationHandler("current", currentPage);
                            }}
                            previousClick={() => paginationHandler("prev")}
                            nextClick={() => paginationHandler("next")}
                            displayDataSet={normalizedRequestList(requestList)}
                        />
                    ) : (
                        <NoRecordFound />
                    )}
                </Card>
            </Container>
            <Modal title={t("changeShift")} showModel={changeShiftModel} toggle={() => setChangeShiftModel(!changeShiftModel)}>
                <Container >
                    <Container
                        col={"col-xl-5 col-md-6 col-sm-12"}
                        additionClass={"xl-4"}
                    >
                        <DropDown
                            label={t('selectWeeklyShift')}
                            placeholder={t('selectWeeklyShift')}
                            data={branchShifts}
                            value={requestDetails.shiftId}
                            name={"shiftId"}
                            onChange={(event) => {
                                onChangeHandler(dropDownValueCheckByEvent(event, t('selectWeeklyShift')))
                            }}
                        />
                    </Container>
                    <Container
                        col={"col-xl-5 col-md-6 col-sm-12"}
                        additionClass={"xl-4"}
                    >
                        <InputText
                            label={t("reason")}
                            validator={validateDefault}
                            value={requestDetails.reason}
                            name={"reason"}
                            onChange={(event) => {
                                onChangeHandler(event);
                            }}
                        />
                    </Container>
                    <Container margin={"mt-5"} additionClass={"text-right"}>
                        <Secondary
                            text={t("cancel")}
                            onClick={() => setChangeShiftModel(!changeShiftModel)}
                        />
                        <Primary
                            text={t("request")}
                            onClick={() => onRequestHandler()}
                        />
                    </Container>
                </Container>
            </Modal>
        </div>
    )
}

export default EmployeeShiftRequest
