import { Container, DropDown, FormWrapper, Icon, ImageView, InputDefault, InputText, Modal, Primary, Secondary } from '@components'
import { Icons } from '@assets';
import { goTo, ROUTE, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';


function CreateGroup() {


    const [allowances, setAllowances] = useState([{ name: "HRA", percentage: '40%' }])

    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const [addAllowanceModel, setAddAllowanceModel] = useState(false)
    const [selectAllowanceModel, setSelectAddAllowanceModel] = useState(false)
    const [defaultState, setDefaultState] = useState([{ id: 1, name: "HRA" }, { id: 2, name: "TA" }, { id: 3, name: "DA" }])
    const [selectedAllowences, setSelectedAllowences] = useState<any>([])

    const { groupFor } = useSelector(
        (state: any) => state.PayrollReducer
    );

    const onDeleteAllowence = (item: any) => {
        const filteredPeople = selectedAllowences.filter((it: any) => it.id !== item.id)
        setSelectedAllowences(filteredPeople)
    }


    useEffect(() => {
        if (selectedAllowences.length === 0) {
            setSelectAddAllowanceModel(!selectAllowanceModel)
        }
    }, [])
    return (
        <>
            <FormWrapper
                title={groupFor === 'Allowance' ? t('CreateAllowanceGroup') : t('CreateDeductionGroup')}
                onClick={() => console.log('clicked')}>
                <InputText
                    label={t("GroupName")}
                    onChange={(event) => {
                        // onChangeHandler(event);
                    }}
                />
                <Container>
                    {selectedAllowences && selectedAllowences.length > 0 && selectedAllowences.map((el: any) => {
                        return (
                            <Container additionClass='row'>
                                <Container additionClass='col-xl-2 mt-4'>
                                    <h4>{el.name}</h4>
                                </Container>
                                <Container additionClass='col-xl-2'>
                                    <InputText
                                        additionClass='col-xl-1'
                                        onChange={(event) => {
                                            // onChangeHandler(event);
                                        }}
                                    />
                                </Container>
                                <h3 className='col ml--3 mt-3'>{"%"}</h3>
                                <td className="col-xl-7 mt-3" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={Icons.Remove} onClick={() => {
                                    onDeleteAllowence(el)
                                }} /></td>
                            </Container>
                        )
                    })}
                    <Container additionClass='row'>
                        <Container additionClass='col-xl-2 mt-4'>
                            <h4>{"Total"}</h4>
                        </Container>
                        <Container additionClass='col-xl-2'>
                            <InputText
                                additionClass='col-xl-1'
                                onChange={(event) => {
                                    // onChangeHandler(event);
                                }}
                            />
                        </Container>
                        <h3 className='col ml--3 mt-3'>{"%"}</h3>
                        <Container additionClass='col-5 row'>
                            <h3 className='col  mt-3'>{"Remaining"}</h3>
                            <h3 className='col mt-3'>{'100'}{"%"}</h3>
                        </Container>
                    </Container>
                </Container>
                <Container additionClass="text-right">
                    <Primary
                        text={t("AddAnother")}
                        onClick={() => setSelectAddAllowanceModel(!selectAllowanceModel)}
                        col={"col-xl-3"}
                        size={"btn-md"}
                    />
                </Container>
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
                            const isActive = selectedAllowences.some((item: any) => item.id === el.id)
                            return (
                                <Container additionClass='row mx-3'>
                                    <Container additionClass="row">
                                        <Container additionClass='col-xl-7 mt-3'>
                                            <h3>{el.name}</h3>
                                        </Container>
                                        <td className="col-2" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={isActive ? Icons.TickActive : Icons.TickDefault} onClick={() => {
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

export default CreateGroup
