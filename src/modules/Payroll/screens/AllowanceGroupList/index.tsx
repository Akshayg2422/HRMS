import { CommonDropdownMenu, CommonTable, Container, DropDown, FormWrapper, Icon, ImageView, InputText, Modal, NoRecordFound, Primary, ScreenContainer, Secondary, TableWrapper } from '@components'
import { Icons } from '@assets';
import { goTo, INITIAL_PAGE, ROUTE, useNav } from '@utils'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { CreateGroup, getAllowanceGroupDetails, getAllowanceGroups, getAllowanceGroupsPaginated, settingSelectedAllowanceGroupDetails } from '../../../../store/Payroll/actions';

const DROPDOWN_ITEM = [
    { id: '1', name: 'Edit', value: 'CL', icon: 'ni ni-active-40' },
]

function AllowanceGroupList() {

    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();

    const { allowanceGroupsList, numOfPages, currentPage } = useSelector(
        (state: any) => state.PayrollReducer
    );

    useEffect(() => {
        getAllowanceGroupList(INITIAL_PAGE)
    }, [])

    const getAllowanceGroupList = (pageNumber: number) => {

        const params = {
            page_number: pageNumber,
        }

        dispatch(getAllowanceGroupsPaginated({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {

            }
        }));
    }

    const getAllowanceDetails = (item: any) => {

        const params = {}

        dispatch(getAllowanceGroupDetails({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {

            }
        }));
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
        item ? dispatch(settingSelectedAllowanceGroupDetails(item)) : dispatch(settingSelectedAllowanceGroupDetails(undefined))
        goTo(navigation, ROUTE.ROUTE_CREATE_GROUP)

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
        getAllowanceGroupList(page);
    }

    const memoizedTable = useMemo(() => {
        return <>
            {allowanceGroupsList?.data && allowanceGroupsList?.data?.length > 0 ? (
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
                    displayDataSet={normalizedAllowanceList(allowanceGroupsList?.data)}
                    // tableOnClick={(e, index, item) => {
                    //     const current = allowanceGroupsList?.data[index]
                    //     getAllowanceDetails(current)
                    // }}
                />
            ) : <NoRecordFound />}
        </>
    }, [allowanceGroupsList?.data])


    return (
        <>
            <TableWrapper
                title={t('AllowanceGroupList')}
                buttonChildren={
                    <Primary
                        text={t("add")}
                        additionClass={'col-sm-0 mr--1'}
                        onClick={() => {
                            dispatch(CreateGroup('Allowance'))
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

export default AllowanceGroupList
