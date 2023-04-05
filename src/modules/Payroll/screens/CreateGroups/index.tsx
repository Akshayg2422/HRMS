import { Container, DropDown, FormWrapper, Icon, ImageView, InputDefault, InputNumber, InputText, Modal, Primary, Secondary } from '@components'
import { Icons } from '@assets';
import { goTo, ROUTE, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';


function CreateGroup() {



    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const [allowances, setAllowances] = useState<any>([])
    const [addAllowanceModel, setAddAllowanceModel] = useState(false)
    const [selectAllowanceModel, setSelectAddAllowanceModel] = useState(false)
    const [defaultState, setDefaultState] = useState([{ id: 1, name: "HRA" }, { id: 2, name: "TA" }, { id: 3, name: "DA" }])
    const [selectedAllowances, setSelectedAllowances] = useState<any>([])
    const [groupName, setGroupName] = useState('')
    const [total, setTotal] = useState<any>()
    const [remaining, setRemaining] = useState(100)

    const { groupFor } = useSelector(
        (state: any) => state.PayrollReducer
    );

    useEffect(() => {
        if (selectedAllowances.length === 0) {
            setSelectAddAllowanceModel(!selectAllowanceModel)
        }
        onTotalCalculator()
    }, [selectedAllowances])

    const addSelectedAllowance = (item: any) => {
        let updateSelectedAllowance = [...allowances];
        const branchExists = updateSelectedAllowance.some(
            (eachBranch) => eachBranch.id === item.id
        );
        if (branchExists) {
            updateSelectedAllowance = updateSelectedAllowance.filter(
                (eachItem) => eachItem.id !== item.id
            );
        } else {
            let addedKey = { ...item, percentage: '' }
            updateSelectedAllowance = [...updateSelectedAllowance, addedKey];
        }
        setAllowances(updateSelectedAllowance)
    };

    const onDeleteAllowence = (item: any) => {
        const filteredPeople = selectedAllowances.filter((it: any) => it.id !== item.id)
        setSelectedAllowances(filteredPeople)
        setAllowances(filteredPeople)

    }

    const onPercentageChangeHandler = ((index: number, event: any) => {
        let updatePercentage = [...selectedAllowances]
        updatePercentage[index].percentage = event.target.value
        setSelectedAllowances(updatePercentage)
    })

    const onTotalCalculator = () => {
        const AllowancePercentage = selectedAllowances.map((el: any) => +el.percentage).reduce(
            (accumulator: any, currentValue: any) => accumulator + currentValue,
            0
        );
        setTotal(AllowancePercentage)
        let remainingPercentage = AllowancePercentage > 0 ? 100 - AllowancePercentage : 100
        setRemaining(remainingPercentage)
    }

    const onAllowanceOnSubmit = () => {
        setSelectedAllowances(allowances)
        setSelectAddAllowanceModel(!selectAllowanceModel)
    }

    const ALLOWANCE_TYPE = [
        { id: 1, name: "%", value: "%" },
        { id: 2, name: '₹', value: '₹' }
    ]

    return (
        <>
            <FormWrapper
                title={groupFor === 'Allowance' ? t('CreateAllowanceGroup') : t('CreateDeductionGroup')}
                buttonDisable={remaining !== 0 && true}
                onClick={() => console.log('clicked')}>
                <InputText
                    label={t("GroupName")}
                    value={groupName}
                    onChange={(event) => {
                        setGroupName(event.target.value);
                    }}
                />
                <Container>
                    {selectedAllowances && selectedAllowances.length > 0 && selectedAllowances.map((el: any, i: number) => {
                        return (
                            <Container additionClass='row'>
                                <Container additionClass={'col-xl-5 col col-sm-0'}>
                                    <InputNumber
                                        label={el.name}
                                        additionClass={'col-xl-2'}
                                        onChange={(event: any) => {
                                            onPercentageChangeHandler(i, event);
                                        }}
                                    />
                                </Container>
                                <Container additionClass={'col-xl-3 col col-sm-0'}>
                                    <Container additionClass='row mt-4'>
                                        <Container additionClass='col-xl-7'>
                                            <DropDown
                                                placeholder={'Type'}
                                                data={ALLOWANCE_TYPE}
                                            />
                                        </Container>
                                        {/* <h3 className='col-xl col col-sm-0 mt-3 ml--3'>{"%"}</h3> */}
                                        <td className='col-xl col col-sm-0 mt-3 ' style={{ whiteSpace: "pre-wrap" }}><ImageView icon={Icons.Remove} onClick={() => {
                                            onDeleteAllowence(el)
                                        }} /></td>
                                    </Container>
                                </Container>
                            </Container>
                        )
                    })}
                    {selectedAllowances.length > 0 &&
                        <>
                            <Container additionClass='row'>
                                <Container additionClass={'col-xl-5 col col-sm-0'}>
                                    <InputNumber
                                        disabled
                                        label='Total'
                                        additionClass={'col-xl-2'}
                                        value={total}
                                    />
                                </Container>
                                <Container additionClass='col mt-4'>
                                    <h3 className='col-xl col col-sm-0 mt-3 ml--4'>{"%"}</h3>
                                </Container>
                            </Container>
                            <Container additionClass='my-xl-4 my-3 my-sm-0 row'>
                                <h3 style={{ color: remaining === 0 ? "#000000" : "#FF5733" }}>{`Remaining ${" "} ${remaining} %`}</h3>
                            </Container>
                        </>
                    }
                </Container>
                <Container additionClass="text-right">
                    <Primary
                        text={t("AddAnother")}
                        onClick={() => setSelectAddAllowanceModel(!selectAllowanceModel)}
                        col={"col-xl-2 col-5 col-sm-0"}
                        size={"btn-sm"}
                    />
                </Container>
            </FormWrapper>
            <Modal
                title={groupFor === 'Allowance' ? t("SelectAllowance") : t('SelectDeduction')}
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
                        {defaultState.map((el: any) => {
                            const isActive = allowances.some((item: any) => item.id === el.id)
                            return (
                                <Container additionClass='row mx-3'>
                                    <Container additionClass='col-xl-7 col-4 col-sm-0 mt-3'>
                                        <h3>{el.name}</h3>
                                    </Container>
                                    <td className="col-xl-2 col-3 col-sm-0 mt-3 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={isActive ? Icons.TickActive : Icons.TickDefault} onClick={() => {
                                        addSelectedAllowance(el)
                                    }} /></td>
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
                                onAllowanceOnSubmit()
                            }}
                        />
                    </Container>
                </Container>
            </Modal>
            <Modal
                title={groupFor === 'Allowance' ? t("AddAllowance") : t('AddDeduction')}
                showModel={addAllowanceModel}
                toggle={() => setAddAllowanceModel(!addAllowanceModel)}
            >
                <Container>
                    <Container additionClass='col-xl-6'>
                        <InputText
                            label={groupFor === 'Allowance' ? t("AllowanceName") : t('DeductionName')}
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
