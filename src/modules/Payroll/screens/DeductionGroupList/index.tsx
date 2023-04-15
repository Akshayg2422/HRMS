import { CommonDropdownMenu, CommonTable, Container, DropDown, FormWrapper, Icon, ImageView, InputText, Modal, NoRecordFound, Primary, Secondary, TableWrapper } from '@components'
import { Icons } from '@assets';
import { goTo, ROUTE, useNav } from '@utils'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CreateGroup, getCompanyDeductions, getCompanyDeductionsPaginated, settingSelectedDeductionDetails } from '../../../../store/Payroll/actions';

const DROPDOWN_ITEM = [
    { id: '1', name: 'Edit', value: 'CL', icon: 'ni ni-active-40' },
]

function DeductionGroupList() {

    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const [addAllowanceModel, setAddAllowanceModel] = useState(false)
    const [selectAllowanceModel, setSelectAddAllowanceModel] = useState(false)
    const [defaultState, setDefaultState] = useState([{ id: 1, name: "Muthu" }, { id: 2, name: "Iniyan" }, { id: 3, name: "Puma" }])
    const [selectedAllowences, setSelectedAllowences] = useState<any>([])

    const { companyDeductionsList, numOfPages, currentPage } = useSelector(
        (state: any) => state.PayrollReducer
    );

    const onDeleteAllowence = (item: any) => {
        const filteredPeople = selectedAllowences?.filter((it: any) => it.id !== item.id)
        setSelectedAllowences(filteredPeople)
    }

    useEffect(() => {
        getCompanyDeductionsList(currentPage)
    }, [])


    const getCompanyDeductionsList = (pageNumber: number) => {

        const params = {
            page_number: pageNumber
        }

        dispatch(getCompanyDeductionsPaginated({
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
        getCompanyDeductionsList(page);
    }

    const normalizedAllowanceList = (data: any) => {
        return data.map((el: any, index: number) => {
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
        item ? dispatch(settingSelectedDeductionDetails(item)) : dispatch(settingSelectedDeductionDetails(undefined))
        goTo(navigation, ROUTE.ROUTE_ADD_DEDUCTION)
    }


    const memoizedTable = useMemo(() => {
        return <>
            {companyDeductionsList?.data && companyDeductionsList?.data?.length > 0 ? (
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
                    displayDataSet={normalizedAllowanceList(companyDeductionsList?.data)}
                    tableOnClick={(e, index, item) => {

                    }}
                />
            ) : <NoRecordFound />}
        </>
    }, [companyDeductionsList?.data])


    return (
        <>
            <TableWrapper
                title={t('DeductionGroupList')}
                buttonChildren={
                    <Primary
                        text={t("add")}
                        additionClass={'col-sm-0 mr--1'}
                        onClick={() => {
                            dispatch(CreateGroup('Deduction'))
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

export default DeductionGroupList
