import { Container, DropDown, FormWrapper, Icon, ImageView, InputText, Modal, Primary, Secondary } from '@components'
import { Icons } from '@assets';
import { goTo, ROUTE, useNav } from '@utils'
import React, { useEffect, useState } from 'react'
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


    return (
        <>
            <FormWrapper
                title={t('AllowanceGroupList')}
                onClick={() => console.log('clicked')}>
                <InputText
                    label={t("DefaultGroupName")}
                    onChange={(event) => {
                        // onChangeHandler(event);
                    }}
                />
                <Container additionClass="text-right">
                    <Primary
                        text={t("add")}
                        // onClick={() => setSelectAddAllowanceModel(!selectAllowanceModel)}
                        onClick={() => {
                            dispatch(CreateGroup('Allowance'))
                            goTo(navigation, ROUTE.ROUTE_CREATE_GROUP)
                        }
                        }

                        col={"col-xl-3"}
                        size={"btn-md"}
                    />
                </Container>
            </FormWrapper>

        </>
    )
}

export default AllowanceGroupList
