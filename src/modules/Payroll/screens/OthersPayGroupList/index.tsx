import { CommonDropdownMenu, CommonTable, Container, DropDown, FormWrapper, Icon, ImageView, InputText, Modal, NoRecordFound, Primary, Secondary, TableWrapper } from '@components'
import { Icons } from '@assets';
import { goTo, INITIAL_PAGE, ROUTE, useNav } from '@utils'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CreateGroup, getCompanyDeductions, getCompanyDeductionsPaginated, getCompanyIncentive, settingSelectedDeductionDetails, settingSelectedIncentiveGroupDetails } from '../../../../store/Payroll/actions';

const DROPDOWN_ITEM = [
    { id: '1', name: 'Edit', value: 'CL', icon: 'ni ni-active-40' },
]

function OthersPayGroupList() {

    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const [selectedAllowences, setSelectedAllowences] = useState<any>([])
    const [deductionsData, setDeductionsData] = useState<any>([])


    const { companyIncentiveList, numOfPages, currentPage } = useSelector(
        (state: any) => state.PayrollReducer
    );

    const onDeleteAllowence = (item: any) => {
        const filteredPeople = selectedAllowences?.filter((it: any) => it.id !== item.id)
        setSelectedAllowences(filteredPeople)
    }

    useEffect(() => {
        getCompanyOthersPayList(INITIAL_PAGE)
    }, [])


    const getCompanyOthersPayList = (pageNumber: number) => {

        const params = {
            page_number: pageNumber
        }

        dispatch(getCompanyIncentive({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: any) => () => {

            }
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
        getCompanyOthersPayList(page);
    }

    const normalizedAllowanceList = (data: any) => {
        return data && data.length > 0 && data.map((el: any, index: number) => {
            return {
                name: el.name,
                "": <CommonDropdownMenu
                    data={DROPDOWN_ITEM}
                    onItemClick={(e, item) => {
                        e.stopPropagation()
                        manageRouteHandler(el)
                    }}
                />

            };
        });
    };

    const manageRouteHandler = (item: any) => {
        item ? dispatch(settingSelectedIncentiveGroupDetails(item)) : dispatch(settingSelectedIncentiveGroupDetails(undefined))
        goTo(navigation, ROUTE.ROUTE_CREATE_OTHERS_PAY)
    }


    const memoizedTable = useMemo(() => {
        return <>
            {companyIncentiveList && companyIncentiveList.length > 0 ? (
                <CommonTable
                    // noHeader
                    card={false}
                    isPagination
                    currentPage={currentPage}
                    noOfPage={numOfPages}
                    paginationNumberClick={(currentPage) => {
                        paginationHandler("current", currentPage);
                    }}
                    previousClick={() => paginationHandler("prev")}
                    nextClick={() => paginationHandler("next")}
                    displayDataSet={normalizedAllowanceList(companyIncentiveList)}
                    tableOnClick={(e, index, item) => {

                    }}
                />
            ) : <NoRecordFound />}
        </>
    }, [companyIncentiveList])


    return (
        <>
            <TableWrapper
                title={t('Others Pay List')}
                buttonChildren={
                    <Primary
                        text={t("add")}
                        additionClass={'col-sm-0 mr--1'}
                        onClick={() => {
                            manageRouteHandler(undefined)
                        }
                        }
                        size={"btn-sm"}
                    />
                }
            >
                {memoizedTable}
            </TableWrapper>

        </>
    )
}

export default OthersPayGroupList
