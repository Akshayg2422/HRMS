import { BackArrow, Card, CommonTable, Container, DropDown, InputText, Modal, NoRecordFound, Primary, Secondary, TableWrapper, useKeyPress } from '@components'
import { getBranchShifts, getBranchWeeklyShifts, getShiftRequestedStatus, postRequestShiftChange } from '../../../../store/shiftManagement/actions';
import { dropDownValueCheck, dropDownValueCheckByEvent, getRequestType, INITIAL_PAGE, LEAVES_TYPE, REQUEST_TYPE, REQUEST_TYPE_SUBSET, showToast, useNav, validateDefault } from '@utils'
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function EmployeeShiftRequest() {
    const navigation = useNav();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const enterPress = useKeyPress("Enter");

    const { requestList, currentPage, numOfPages, branchShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );
    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const [requestTypes, setRequestTypes] = useState(REQUEST_TYPE_SUBSET[0].name);


    useEffect(() => {
        getRequestList(getRequestType(requestTypes), INITIAL_PAGE);
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
            dispatch(getShiftRequestedStatus({
                params,
                onSuccess: (success: any) => () => {

                },
                onError: (error: any) => () => {

                }
            }));
        }
    }


    const normalizedRequestList = (data: any) => {
        return (
            data &&
            data.length > 0 &&
            data.map((el: any) => {
                return {
                    'Employee': `${el?.name}${' '}(${el.employee_id})`,
                    "Branch": el?.branch_name,
                    "Shift": el?.shift_details?.name,
                    "Status": el?.status_text
                };
            })
        );
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
        getRequestList(getRequestType(requestTypes), page);
    }

    const memoizedTable = useMemo(() => {
        return <>
            {requestList && requestList.length > 0 ? (
                <CommonTable
                    noHeader
                    card={false}
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
            ) : <NoRecordFound />}
        </>
    }, [requestList])

    return (
        <TableWrapper>
            <Container additionClass={" main-contain mx-3"}>
                <div>
                    <h2 className='mt-3'>{t("shiftRequestHistory")}</h2>
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
                    </Container>
                </div>

            </Container>
            <div>
                <h2 className='ml-3'>{t("requestList")}</h2>
                <>
                    {
                        memoizedTable
                    }
                </>
            </div>

        </TableWrapper>
    )
}

export default EmployeeShiftRequest
