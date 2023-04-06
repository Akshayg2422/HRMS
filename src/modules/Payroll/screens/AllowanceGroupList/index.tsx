import { Container, DropDown, FormWrapper, Icon, ImageView, InputText, Modal, Primary, ScreenContainer, Secondary, TableWrapper } from '@components'
import { Icons } from '@assets';
import { goTo, ROUTE, useNav } from '@utils'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { CreateGroup } from '../../../../store/Payroll/actions';

function AllowanceGroupList() {

    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();


    useEffect(() => {
        // setSelectAddAllowanceModel(!selectAllowanceModel)
    }, [])

    const memoizedTable = useMemo(() => {
        return <>

        </>
    }, [])


    return (
        <>
            <TableWrapper
                title={t('AllowanceGroupList')}
                buttonChildren={
                    <Primary
                        text={t("add")}
                        additionClass={'col-sm-0 mr--4'}
                        onClick={() => {
                            dispatch(CreateGroup('Allowance'))
                            goTo(navigation, ROUTE.ROUTE_CREATE_GROUP)
                        }
                        }
                        size={"btn-md"}
                    />
                }
            >
                {memoizedTable}
            </TableWrapper>

        </>
    )
}

export default AllowanceGroupList
