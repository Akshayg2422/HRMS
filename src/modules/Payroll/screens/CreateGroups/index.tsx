import { Card, CheckBox, CommonDropdownMenu, Container, DatePicker, DropDown, FormWrapper, Icon, ImageView, InputDefault, InputNumber, InputText, Modal, Primary, ScreenContainer, Secondary } from '@components'
import { Icons } from '@assets';
import { goBack, goTo, ROUTE, showToast, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { log } from 'console';
import { addAllowanceGroup, addCompanyAllowance, addCompanyDeduction, getAllowanceGroupDetails, getCompanyAllowance } from '../../../../store/Payroll/actions';

const ALLOWANCE_TYPE = [
    { id: "1", name: "Percentage", value: "Percentage" },
    { id: "2", name: 'Amount', value: 'Amount' }
]


const DROPDOWN_ITEM = [
    { id: '1', name: 'Edit', value: 'CL', icon: 'ni ni-active-40' },
]

function CreateGroup() {

    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const [allowances, setAllowances] = useState<any>([])
    const [addAllowanceModel, setAddAllowanceModel] = useState(false)
    const [selectAllowanceModel, setSelectAddAllowanceModel] = useState(false)
    const [selectedAllowances, setSelectedAllowances] = useState<any>([])


    const [groupName, setGroupName] = useState('')
    const [name, setName] = useState('')
    const [hint, setHint] = useState('')
    const [maximumLimit, setMaximumLimit] = useState('')
    const [minimumLimit, setMinimumLimit] = useState('')
    const calendarYear = '2023-12-31'
    const [isTaxable, setIsTaxable] = useState(false)

    const [isEditCompanyAllowance, setIsEditCompanyAllowance] = useState(false)
    const [editAllowanceItem, setEditAllowanceItem] = useState<any>()

    const { groupFor, companyAllowanceList, selectedAllowanceGroupDetails } = useSelector(
        (state: any) => state.PayrollReducer
    );

    useEffect(() => {
        if (selectedAllowanceGroupDetails) {
            getAllowanceGroupDetailsData()
        }

    }, [])

    const getAllowanceGroupDetailsData = () => {

        const params = {
            id: selectedAllowanceGroupDetails.id
        }
        dispatch(getAllowanceGroupDetails({
            params,
            onSuccess: (success: any) => () => {
                setGroupName(selectedAllowanceGroupDetails.name)
                setSelectedAllowances(success?.details?.allowance_break_down?.allowance_items.map((el: any) => ({ ...el, type: el.is_percent ? '1' : '2' })))
            },
            onError: (error: any) => () => {

            }
        }));

    }


    const addSelectedAllowance = (item: any) => {
        let updateSelectedAllowance = [...allowances];

        const branchExists = updateSelectedAllowance.some(
            (eachBranch) => eachBranch.id === item.id
        );

        if (branchExists) {
            updateSelectedAllowance = updateSelectedAllowance.filter(
                (eachItem) => eachItem.id !== item.id
            );
        }
        else {
            let addedKey = { ...item, allowance_id: item.id, percent: 0, amount: 0, is_percent: false, type: "1" }
            updateSelectedAllowance = [...updateSelectedAllowance, addedKey];
        }
        setAllowances(updateSelectedAllowance)
    };

    const getCompanyAllowanceList = () => {

        const params = {}

        dispatch(getCompanyAllowance({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {

            }
        }));
    }

    const onDeleteAllowence = (item: any) => {
        const filteredPeople = selectedAllowances.filter((it: any) => it.id !== item.id)
        setSelectedAllowances(filteredPeople)
        setAllowances(filteredPeople)

    }

    const onChangeHandler = ((index: number, event: any) => {

        let updatePercentage = [...selectedAllowances]
        if (updatePercentage[index].type == "1") {
            updatePercentage[index].percent = event.target.value
            updatePercentage[index].amount = 0
            setSelectedAllowances(updatePercentage)
        }
        else {
            updatePercentage[index].percent = 0
            updatePercentage[index].amount = event.target.value
            setSelectedAllowances(updatePercentage)
        }

    })


    const onAllowanceOnSubmit = () => {
        setSelectedAllowances(allowances)
        setSelectAddAllowanceModel(!selectAllowanceModel)
    }



    const validatePostParams = () => {

        if (!groupName) {
            showToast('error', "Group name should not be empty")
            return false
        }
        // else if (selectedAllowances) {
        //     selectedAllowances.map((item: any) => {
        //         if ((item.percent == 0 || item.percent == '') || (item.amount == 0 || item.amount == '')) {
        //             showToast('error', 'Allowance field should not be empty')
        //             return false
        //         }
        //     })
        // }
        else {
            return true
        }
    }

    const onAllowanceGroupAdd = () => {

        const filteredApiKeys = selectedAllowances.map((el: any) => {
            return {
                allowance_id: el.allowance_id,
                percent: el.percent,
                amount: el.amount,
                is_percent: el.type == "1" ? true : false
            }
        })

        if (validatePostParams()) {
            const params = {
                name: groupName,
                calendar_year: calendarYear,
                allowances_ids: { create_update: filteredApiKeys },
                ...(selectedAllowanceGroupDetails && { id: selectedAllowanceGroupDetails.id })
            }


            dispatch(addAllowanceGroup({
                params,
                onSuccess: (success: any) => () => {
                    showToast('success', success.message)
                    goBack(navigation)

                },
                onError: (error: any) => () => {

                }
            }));
        }

    }

    const onAllowanceAdd = () => {

        const params = {
            name: name,
            hint: hint,
            calendar_year: calendarYear,
            is_taxable: isTaxable,
            max_limit: maximumLimit ? maximumLimit : -1,
            ...(isEditCompanyAllowance && editAllowanceItem && { id: editAllowanceItem?.id })
        }

        dispatch(addCompanyAllowance({
            params,
            onSuccess: (success: any) => () => {
                getCompanyAllowanceList()
                setAddAllowanceModel(!addAllowanceModel)
                // goBack(navigation);
            },
            onError: (error: any) => () => {

            }
        }));


    }


    return (

        <ScreenContainer>
            <Card additionClass='mx--3'>
                <Container additionClass='d-flex justify-content-between'>
                    <Container additionClass='mb-4'>
                        <h3>{!selectedAllowanceGroupDetails ? t('CreateAllowanceGroup') : 'Edit Allowance group'}</h3>
                    </Container>

                    <Container>
                        <Primary
                            text={'Add Allowance'}
                            onClick={() => {
                                getCompanyAllowanceList()
                                setSelectAddAllowanceModel(!selectAllowanceModel)
                            }}
                            size={"btn-sm"}
                        />
                    </Container>
                </Container>


                <Container additionClass='col-xl-5'>
                    <InputText
                        label={t("GroupName")}
                        placeholder={t("GroupName")}
                        value={groupName}
                        onChange={(event) => {
                            setGroupName(event.target.value)
                        }}
                    />
                </Container>


                <Container>
                    {selectedAllowances && selectedAllowances.length > 0 && selectedAllowances.map((el: any, i: number) => {

                        return (
                            <Container additionClass='row'>
                                <Container additionClass={'col-xl-5 col col-sm-0'}>
                                    <InputNumber
                                        label={el.name}
                                        value={el.type == "1" ? el.percent : el.amount}
                                        additionClass={'col-xl-2'}
                                        onChange={(event: any) => {
                                            onChangeHandler(i, event);
                                        }}
                                    />
                                </Container>
                                <Container additionClass={'col-xl-3 col col-sm-0'}>
                                    <Container additionClass='row mt-4'>
                                        <DropDown
                                            additionClass='col-xl-6'
                                            data={ALLOWANCE_TYPE}
                                            placeholder={'Select Type'}
                                            value={el.type}
                                            onChange={(e) => {
                                                let updatePercentage = [...selectedAllowances]
                                                updatePercentage[i].type = e.target.value
                                                updatePercentage[i].percent = 0
                                                updatePercentage[i].amount = 0
                                                setSelectedAllowances(updatePercentage)
                                            }}
                                        />
                                        {/* <h3 className='col-xl col col-sm-0 mt-3 ml--3'>{"%"}</h3> */}
                                        <td className='col-xl col col-sm-0 mt-3 ' style={{ whiteSpace: "pre-wrap" }}><ImageView icon={Icons.Remove} onClick={() => {
                                            onDeleteAllowence(el)
                                        }} /></td>
                                    </Container>
                                </Container>
                            </Container>
                        )
                    })}
                </Container>

                <Container margin={"mt-5"} additionClass={"text-right"}>
                    <Primary
                        text={t("submit")}
                        onClick={() => onAllowanceGroupAdd()}
                    />
                </Container>

            </Card>

            <Modal
                title={groupFor === 'Allowance' ? t("SelectAllowance") : t('SelectDeduction')}
                showModel={selectAllowanceModel}
                toggle={() => setSelectAddAllowanceModel(!selectAllowanceModel)}
            >
                <Container>
                    <Container additionClass={'text-right mt--3'}
                    >
                        <Primary
                            size='btn-sm'
                            text={t("AddNew")}
                            onClick={() => setAddAllowanceModel(!addAllowanceModel)}
                        />
                    </Container>
                    <Container>
                        {companyAllowanceList.data && companyAllowanceList?.data?.map((el: any) => {

                            const isActive = allowances.some((item: any) => item.id === el.id)
                            return (
                                <Container additionClass='d-flex justify-content-between my-4'>
                                    <Container additionClass='col-xl-6 col-sm-0 '>
                                        <h3>{el.name}</h3>
                                    </Container>
                                    <td className="col-xl-2 col-sm-0 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={isActive ? Icons.TickActive : Icons.TickDefault} onClick={() => {
                                        addSelectedAllowance(el)
                                    }} /></td>
                                    <Container additionClass='col-xl-2 col-2 col-sm-0 mt-sm-0'>
                                        <CommonDropdownMenu
                                            data={DROPDOWN_ITEM}
                                            onItemClick={(e, item) => {
                                                e.stopPropagation()
                                                setEditAllowanceItem(el)
                                                setName(el.name)
                                                setHint(el.name)
                                                setMaximumLimit(el.max_limit)
                                                setIsTaxable(el.is_taxable)
                                                setIsEditCompanyAllowance(true)
                                                setAddAllowanceModel(!addAllowanceModel)
                                            }}
                                        />
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
                                onAllowanceOnSubmit()
                            }}
                        />
                    </Container>
                </Container>
            </Modal>

            <Modal
                title={!isEditCompanyAllowance ? t("AddAllowance") : 'Edit allowance'}
                showModel={addAllowanceModel}
                toggle={() => {
                    setIsEditCompanyAllowance(false)
                    setAddAllowanceModel(!addAllowanceModel)
                }}
            >
                <InputText
                    label={t('name')}
                    placeholder={t('name')}
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />

                <InputText
                    label={'Hint'}
                    placeholder={'Hint'}
                    value={hint}
                    onChange={(event) => {
                        setHint(event.target.value);
                    }}
                />

                {groupFor === 'Deduction' && (
                    <InputText
                        label={'Minimum limit'}
                        placeholder={'Minimum limit'}
                        value={minimumLimit}
                        onChange={(event) => {
                            setMinimumLimit(event.target.value);
                        }}
                    />
                )}

                <InputText
                    label={'Maximum limit'}
                    placeholder={'Maximum limit'}
                    value={maximumLimit}
                    onChange={(event) => {
                        setMaximumLimit(event.target.value);
                    }}
                />
                {groupFor === 'Allowance' && (
                    <Container additionClass='text-right'>
                        <CheckBox
                            id={'2'}
                            checked={isTaxable}
                            text={"Is taxable"}
                            onChange={(e) => { setIsTaxable(e.target.checked) }}
                        />
                    </Container>
                )}

                <Container margin={"mt-5"} additionClass={"text-right"}>
                    <Secondary
                        text={t("cancel")}
                        onClick={() => {
                            setIsEditCompanyAllowance(false)
                            setAddAllowanceModel(!addAllowanceModel)

                        }}
                    />
                    <Primary
                        text={t("submit")}
                        onClick={() => onAllowanceAdd()}
                    />
                </Container>
            </Modal>
        </ScreenContainer >
    )
}

export default CreateGroup
