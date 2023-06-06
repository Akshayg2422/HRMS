import { Card, CheckBox, CommonDropdownMenu, Container, DatePicker, DropDown, FormWrapper, Icon, ImageView, InputDefault, InputNumber, InputText, Modal, Primary, ScreenContainer, Secondary } from '@components'
import { Icons } from '@assets';
import { goBack, goTo, ROUTE, showToast, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { log } from 'console';
import { addAllowanceGroup, addCompanyAllowance, addCompanyDeduction, getAllowanceGroupDetails, getCompanyAllowance } from '../../../../store/Payroll/actions';
import { logDOM } from '@testing-library/react';

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
    const calendarYear = '2023-12-31'
    const [isTaxable, setIsTaxable] = useState(false)

    const [isEditCompanyAllowance, setIsEditCompanyAllowance] = useState(false)
    const [editAllowanceItem, setEditAllowanceItem] = useState<any>()
    const [isSumbitDisable, setIsSubmitDisable] = useState(false)
    const [remaining, setRemaining] = useState(60)
    const [selectedAllowanceEditData, setSelectedAllowanceEditData] = useState<any>([])

    const { companyAllowanceList, selectedAllowanceGroupDetails } = useSelector(
        (state: any) => state.PayrollReducer
    );

    useEffect(() => {
        if (selectedAllowanceGroupDetails) {
            getAllowanceGroupDetailsData()
        }

    }, [])

    useEffect(() => {
        onTotalCalculator()
    }, [selectedAllowances])

    const getAllowanceGroupDetailsData = () => {

        const params = {
            id: selectedAllowanceGroupDetails?.id
        }
        dispatch(getAllowanceGroupDetails({
            params,
            onSuccess: (success: any) => () => {

                setGroupName(selectedAllowanceGroupDetails?.name)
                setSelectedAllowanceEditData(success?.details?.allowance_break_down?.allowance_items)

                setAllowances(success?.details?.allowance_break_down?.allowance_items.map((el: any) => ({ ...el, type: el.is_percent ? '1' : '2' })))
                setSelectedAllowances(success?.details?.allowance_break_down?.allowance_items.map((el: any) => ({ ...el, type: el.is_percent ? '1' : '2' })))
            },
            onError: (error: any) => () => {

            }
        }));

    }


    const addSelectedAllowance = (item: any) => {
        let updateSelectedAllowance = [...allowances];

        const branchExists = updateSelectedAllowance?.some(
            (eachBranch) => eachBranch.id === item.id || eachBranch.allowance_id === item.id
        );

        if (branchExists) {
            updateSelectedAllowance = updateSelectedAllowance?.filter(
                (eachItem) => eachItem.id !== item.id || eachItem.allowance_id !== item.id
            );
        }
        else {
            let addedKey = { ...item, allowance_id: item.id, percent: '', amount: '', is_percent: false, type: "1", error: '' }
            updateSelectedAllowance = [...updateSelectedAllowance, addedKey];
        }
        setAllowances(updateSelectedAllowance)
    };

    const getCompanyAllowanceList = () => {

        const params = {
            page_number: -1
        }

        dispatch(getCompanyAllowance({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {

            }
        }));
    }

    const onDeleteAllowence = (item: any) => {
        const filteredPeople = selectedAllowances?.filter((it: any) => it.id !== item.id)
        setSelectedAllowances(filteredPeople)
        setAllowances(filteredPeople)

    }

    useEffect(() => {

        const isError = selectedAllowances?.some((item: any) => item.error)
        if (isError) {
            setIsSubmitDisable(true)
        }
        else {
            setIsSubmitDisable(false)

        }

    }, [selectedAllowances])

    const onTotalCalculator = () => {
        const AllowancePercentage = selectedAllowances?.map((el: any) => {
            if (el.type == "1") {
                const checkIsEmpty: any = el.percent == '' ? 0 : el.percent
                const convert = parseInt(checkIsEmpty)
                return +convert
            }
            else {
                return +0
            }
        }).reduce(
            (accumulator: any, currentValue: any) => accumulator + currentValue,
            0
        );

        let remainingPercentage = AllowancePercentage > 0 ? 60 - AllowancePercentage : 60
        setRemaining(remainingPercentage)
    }

    const onChangeHandler = ((index: number, event: any, limit: string | number) => {

        let updatePercentage = [...selectedAllowances]
        if (updatePercentage[index].type == "1") {
            updatePercentage[index].percent = event.target.value
            updatePercentage[index].amount = 0
            if (updatePercentage[index].max_limit !== -1 && updatePercentage[index].type != "1") {
                if (event.target.value > updatePercentage[index].max_limit) {
                    updatePercentage[index].error = '* You have exceeded the maximum limit'
                }
                else {
                    updatePercentage[index].error = ''
                }
            }

            setSelectedAllowances(updatePercentage)
        }
        else {
            updatePercentage[index].percent = 0
            updatePercentage[index].amount = event.target.value

            if (updatePercentage[index].max_limit !== -1 && updatePercentage[index].type != "1") {
                if (event.target.value > updatePercentage[index].max_limit) {
                    updatePercentage[index].error = `* You have exceeded the maximum limit (max ${updatePercentage[index].max_limit})`
                }
                else {
                    updatePercentage[index].error = ''
                }
            }

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
        else if (validateAllowances().status) {
            showToast('error', validateAllowances().errorMessage)
            return false
        }
        else {
            return true
        }
    }

    const validateAllowances = () => {

        let status = { status: false, errorMessage: '' }
        selectedAllowances?.map((item: any) => {

            if (item.amount == '' && (item.percent == 0 || item.percent == '') || (item.percent == '' && (item.amount == 0 || item.amount == ''))) {
                status = { status: true, errorMessage: `Allowance field should not be empty` }
            }

        })
        return status
    }

    const onAllowanceGroupAdd = () => {

        const filteredApiKeys = selectedAllowances && selectedAllowances?.map((el: any) => {
            return {
                ...(selectedAllowanceGroupDetails ? { id: el.id } : { allowance_id: el.id }),
                percent: parseInt(el.percent),
                amount: parseInt(el.amount),
                is_percent: el.type == "1" ? true : false
            }
        })

        if (validatePostParams()) {
            const params = {
                name: groupName,
                calendar_year: calendarYear,
                allowances_items: filteredApiKeys,
                ...(selectedAllowanceGroupDetails && { id: selectedAllowanceGroupDetails.id })
            }

            dispatch(addAllowanceGroup({
                params,
                onSuccess: (success: any) => () => {
                    showToast('success', success.status)
                    goBack(navigation)

                },
                onError: (error: any) => () => {

                }
            }));
        }

    }

    const validateAllowanceAddParams = () => {

        if (!name) {
            showToast('error', 'The Allowance name should not be empty')
            return false
        }
        else {
            return true
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
        if (validateAllowanceAddParams()) {
            dispatch(addCompanyAllowance({
                params,
                onSuccess: (success: any) => () => {
                    getCompanyAllowanceList()
                    setAddAllowanceModel(!addAllowanceModel)
                    setName('')
                    setHint('')
                    setMaximumLimit('')
                    setIsTaxable(false)
                    showToast('success', success?.message)
                },
                onError: (error: any) => () => {
                    showToast('error', error)
                }
            }));
        }

    }

    const isPercentageExist = selectedAllowances?.some((item: any) => item.type === "1")

    return (

        <ScreenContainer>
            <Card additionClass='mx--3'>
                <Container additionClass='d-flex justify-content-between'>
                    <Container additionClass='mb-4'>
                        <h3>{!selectedAllowanceGroupDetails ? t('CreateAllowanceGroup') : t('editAllowanceGroup')}</h3>
                    </Container>
                </Container>


                <Container additionClass='col-xl-5 ml--3'>
                    <InputText
                        label={t("GroupName")}
                        placeholder={t("GroupName")}
                        value={groupName}
                        onChange={(event) => {
                            setGroupName(event.target.value)
                        }}
                    />
                </Container>

                <Container additionClass='mb-3'>
                    <h3>{'Allowance breakdown'}</h3>
                </Container>

                <Container>
                    {selectedAllowances && selectedAllowances?.length > 0 && selectedAllowances?.map((el: any, i: number) => {
                        const isEditData = selectedAllowanceEditData?.some((item: any) => item.allowance_id === el.allowance_id)
                        return (
                            <Container additionClass='row'>
                                <Container additionClass={'col-xl-5 col col-sm-0'}>
                                    <InputNumber
                                        label={el.name}
                                        value={el.type == "1" ? el.percent : el.amount}
                                        additionClass={'col-xl-2'}
                                        onChange={(event: any) => {
                                            onChangeHandler(i, event, el.max_limit);
                                        }}
                                    />
                                    <h6 className='text-danger mt--3'>{el.error}</h6>
                                </Container>
                                <Container additionClass={'col-xl-3 col col-sm-0'}>
                                    <Container additionClass='row mt-4'>
                                        <DropDown
                                            additionClass='col-xl-7'
                                            data={ALLOWANCE_TYPE}
                                            placeholder={t('selectType')}
                                            value={el.type}
                                            onChange={(e) => {
                                                let updatePercentage = [...selectedAllowances]
                                                updatePercentage[i].type = e.target.value
                                                updatePercentage[i].percent = ''
                                                updatePercentage[i].amount = ''
                                                updatePercentage[i].error = ''
                                                setSelectedAllowances(updatePercentage)
                                            }}
                                        />
                                        <td className='col-xl col col-sm-0 mt-3 ' style={{ whiteSpace: "pre-wrap" }}>
                                            {!isEditData ?
                                                <ImageView icon={Icons.Remove} onClick={() => {
                                                    onDeleteAllowence(el)
                                                }} /> : <></>}
                                        </td>
                                    </Container>
                                </Container>
                            </Container>
                        )
                    })}
                </Container>

                {isPercentageExist && (
                    <h5 className="font-weight-light " style={{ color: remaining < 0 ? "#FF5733" : "#000000" }}>{t('remaining')}<strong className="font-weight-bold" style={{ color: remaining < 0 ? "#FF5733" : "#000000" }}>{remaining + ' %'}</strong></h5>
                )}

                {selectedAllowanceGroupDetails ? <></> : <Container>
                    <Primary
                        text={selectedAllowances.length > 0 ? 'Add another' : 'Add new'}
                        onClick={() => {
                            getCompanyAllowanceList()
                            setSelectAddAllowanceModel(!selectAllowanceModel)
                        }}
                        size={"btn-sm"}
                    />
                </Container>
                }


                {selectedAllowances && selectedAllowances?.length > 0 && (
                    <Container margin={"mt-5"} additionClass={"text-right"} >
                        <Primary
                            text={selectedAllowanceGroupDetails ? t('update') : t("submit")}
                            disabled={isSumbitDisable || remaining < 0 ? true : false}
                            onClick={() => onAllowanceGroupAdd()}
                        />
                    </Container>
                )}

            </Card>

            <Modal
                title={t("SelectAllowance")}
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
                        {companyAllowanceList && companyAllowanceList?.map((el: any) => {

                            const isActive = allowances?.some((item: any) => item.id === el.id)

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
                                            onItemClick={() => {
                                                setEditAllowanceItem(el)    
                                                setName(el.name)
                                                setHint(el?.hint)
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
                title={!isEditCompanyAllowance ? t("AddAllowance") : t('editAllowance')}
                showModel={addAllowanceModel}
                toggle={() => {
                    setIsEditCompanyAllowance(false)
                    setAddAllowanceModel(!addAllowanceModel)
                    setName('')
                    setHint('')
                    setMaximumLimit('')
                    setIsTaxable(false)
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

                {/* <InputText
                    label={t('Note')}
                    placeholder={t('Note')}
                    value={hint}
                    onChange={(event) => {
                        setHint(event.target.value);
                    }}
                /> */}

                <InputText
                    label={t('maximumLimit')}
                    placeholder={t('maximumLimit')}
                    type={'number'}
                    value={maximumLimit}
                    onChange={(event) => {
                        setMaximumLimit(event.target.value);
                    }}
                />
                <Container additionClass='text-right'>
                    <CheckBox
                        id={'2'}
                        checked={isTaxable}
                        text={t('isTaxable')}
                        onChange={(e) => { setIsTaxable(e.target.checked) }}
                    />
                </Container>

                <Container margin={"mt-5"} additionClass={"text-right"}>
                    <Secondary
                        text={t("cancel")}
                        onClick={() => {
                            setIsEditCompanyAllowance(false)
                            setAddAllowanceModel(!addAllowanceModel)
                            setName('')
                            setHint('')
                            setMaximumLimit('')
                            setIsTaxable(false)
                        }}
                    />
                    <Primary
                        text={isEditCompanyAllowance ? t('update') : t("submit")}
                        onClick={() => onAllowanceAdd()}
                    />
                </Container>
            </Modal>
        </ScreenContainer >
    )
}

export default CreateGroup
