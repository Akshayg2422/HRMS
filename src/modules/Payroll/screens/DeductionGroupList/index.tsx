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
                {selectedAllowences && selectedAllowences.length > 0 && selectedAllowences.map((el: any) => {
                    return (
                        <Container additionClass='row mx-3'>
                            <Container additionClass="row">
                                <Container additionClass='col'>
                                    <ul><li>{el.name}</li></ul>
                                </Container>
                                <td className="col " style={{ whiteSpace: "pre-wrap" }}><ImageView icon={Icons.Remove} onClick={() => {
                                    onDeleteAllowence(el)
                                }} /></td>
                            </Container>
                        </Container>
                    )
                })}
            </FormWrapper>
            <Modal
                title={t("SelectAllowance")}
                showModel={selectAllowanceModel}
                toggle={() => setSelectAddAllowanceModel(!selectAllowanceModel)}
            >
                <Container>
                    <Container additionClass={'text-right'}
                    >
                        <Primary
                            size='btn-sm'
                            text={t("AddNew")}
                            onClick={() => setAddAllowanceModel(!addAllowanceModel)}
                        />
                    </Container>
                    <Container>
                        {defaultState.map((el) => {
                            return (
                                <Container additionClass='row mx-3'>
                                    <Container additionClass="row">
                                        <Container additionClass='col-xl-7 mt-3'>
                                            <h3>{el.name}</h3>
                                        </Container>
                                        <td className="col-2" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={Icons.TickDefault} onClick={() => {
                                            let updatedSelectedEmployee = [...selectedAllowences]
                                            const isExist = selectedAllowences.some((item: any) => item.id === el.id)
                                            if (!isExist) {
                                                updatedSelectedEmployee = [...updatedSelectedEmployee, el]
                                                setSelectedAllowences(updatedSelectedEmployee)
                                            }
                                        }} /></td>
                                    </Container>
                                </Container>
                            )
                        })}
                    </Container>
                    <Container margin={"mt-5"} additionClass={"text-right"}>
                        <Secondary
                            text={t("cancel")}
                            onClick={() => setSelectAddAllowanceModel(!selectAllowanceModel)}
                        />
                        <Primary
                            text={t("submit")}
                            onClick={() => {
                                setSelectAddAllowanceModel(!selectAllowanceModel)
                            }}
                        />
                    </Container>
                </Container>
            </Modal>
            <Modal
                title={t("AddAllowance")}
                showModel={addAllowanceModel}
                toggle={() => setAddAllowanceModel(!addAllowanceModel)}
            >
                <Container>
                    <Container additionClass='col-xl-6'>
                        <InputText
                            label={t("AllowanceName")}
                            onChange={(event) => {
                                // onChangeHandler(event);
                            }}
                        />
                        <InputText
                            label={t("Hint")}
                            onChange={(event) => {
                                // onChangeHandler(event);
                            }}
                        />
                    </Container>

                    <Container margin={"mt-5"} additionClass={"text-right"}>
                        <Secondary
                            text={t("cancel")}
                            onClick={() => {
                                setAddAllowanceModel(!addAllowanceModel)

                            }}
                        />
                        <Primary
                            text={t("add")}
                            onClick={() => console.log('clicked')}
                        />
                    </Container>
                </Container>
            </Modal>
        </>
    )
}

export default DeductionGroupList
