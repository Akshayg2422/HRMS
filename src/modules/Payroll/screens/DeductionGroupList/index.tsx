import { Container, DropDown, FormWrapper, Icon, ImageView, InputText, Modal, Primary, Secondary } from '@components'
import { Icons } from '@assets';
import { goTo, ROUTE, useNav } from '@utils'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CreateGroup } from '../../../../store/Payroll/actions';

function DeductionGroupList() {

    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const [addAllowanceModel, setAddAllowanceModel] = useState(false)
    const [selectAllowanceModel, setSelectAddAllowanceModel] = useState(false)
    const [defaultState, setDefaultState] = useState([{ id: 1, name: "Muthu" }, { id: 2, name: "Iniyan" }, { id: 3, name: "Puma" }])
    const [selectedAllowences, setSelectedAllowences] = useState<any>([])



    const onDeleteAllowence = (item: any) => {
        const filteredPeople = selectedAllowences.filter((it: any) => it.id !== item.id)
        setSelectedAllowences(filteredPeople)
    }

    useEffect(() => {
        // setSelectAddAllowanceModel(!selectAllowanceModel)
    }, [])


    return (
        <>
            <FormWrapper
                title={t('DeductionGroupList')}
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
                        onClick={() => {
                            dispatch(CreateGroup('Deduction'))
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

export default DeductionGroupList
