import { Card, CheckBox, CommonTable, Container, DropDown, FormWrapper, Icon, ImageView, InputDefault, InputNumber, InputText, Modal, Primary, ScreenContainer } from '@components'
import { goBack, goTo, inputNumberMaxLength, ROUTE, showToast, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  validateBasicSalary
} from "@utils";
import { addCompanyDeduction, addEmployeeSalaryDefinition, getAllowanceGroupDetails, getAllowanceGroups, getCompanyDeductions, getCompanyIncentive, getEmployeeSalaryDefinition, isEditEmployeeSalaryDefinition } from '../../../../store/Payroll/actions';
import { Icons } from '@assets';
import { log } from 'console';


const ALLOWANCE_TYPE = [
  { id: "1", name: "Percentage", value: "Percentage" },
  { id: "2", name: 'Amount', value: 'Amount' }
]

function SalaryBreakDown() {

  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const [annualCTC, setAnnualCTC] = useState()
  const [basicSalary, setBasicSalary] = useState<any>()
  const [minimumAmount, setMinimumAmount] = useState<any>()
  const [maximumAmount, setMaximumAmount] = useState<any>()
  const [color, setColor] = useState("")

  const [selectedDeductions, setSelectedDeductions] = useState<any>([])
  const [isSumbitDisable, setIsSubmitDisable] = useState(false)
  const [deductionAddModal, setDeductionAddModal] = useState(false)
  const [deduction, setDeduction] = useState('')
  const [remaining, setRemaining] = useState(60)
  const calendarYear = '2023-12-31'
  const [allowanceGroup, setAllowanceGroup] = useState('')
  const [editSalaryDefinitionId, setEditSalaryDefinitionId] = useState("")
  const [selectedDefinitionEditData, setSelectedDefinitionEditData] = useState<any>([])
  const [isDisablePayrollView, setIsDisablePayrollView] = useState(false)
  const [deductionsData, setDeductionsData] = useState<any>([])
  const [deductionsDropDownData, setDeductionsDropDownData] = useState<any>([])
  const [OtherPayData, setOtherPayData] = useState<any>([])


  const [selectedOtherPayData, setSelectedOtherPayData] = useState<any>([])
  const [editSelectedOtherPayData, setEditSelectedOtherPayData] = useState<any>([])
  const [allowanceDetails, setAllowanceDetails] = useState<any>([])



  const [autoDebitTds, setAutoDebitTds] = useState(false)
  const [autoDebitPf, setAutoDebitPf] = useState(false)
  const [edit, setEdit] = useState(false)


  const { allowanceGroupsList, companyDeductionsList, companyIncentiveList, selectedEmployeeDetails, isEditSalary } = useSelector(
    (state: any) => state.PayrollReducer
  );

  const { userDetails } = useSelector(
    (state: any) => state.AuthReducer
  );

  // dispatch(isEditEmployeeSalaryDefinition(!isEditSalary))



  useEffect(() => {
    isValidBasicSalary()
  }, [annualCTC, basicSalary])

  useEffect(() => {
    const isError = selectedDeductions?.some((item: any) => item.error)
    if (isError) {
      setIsSubmitDisable(true)
    }
    else {
      setIsSubmitDisable(false)
      isValidBasicSalary()
    }
    onTotalCalculator()
  }, [selectedDeductions])

  useEffect(() => {
    getAllowanceGroupList()
    getCompanyDeductionsList()
    getCompanyOtherPayList()
    if (isEditSalary) {
      getEmployeeSalaryDefinitionDetails()
    }
    return () => {
      dispatch(isEditEmployeeSalaryDefinition(false))

    }
  }, [])

  const getAllowanceGroupList = () => {
    const params = {
      page_number: -1,

    }
    dispatch(getAllowanceGroups({
      params,
      onSuccess: (success: any) => () => {
      },
      onError: (error: any) => () => {

      }
    }));
  }


  const getCompanyDeductionsList = () => {

    const params = {
      page_number: -1
    }

    dispatch(getCompanyDeductions({
      params,
      onSuccess: (success: any) => () => {
        const filteredDeductions = success && success.length > 0 && success?.filter((it: any) => it.type !== "PF")
        setDeductionsDropDownData(filteredDeductions)

      },
      onError: (error: any) => () => {

      }
    }));
  }



  const getCompanyOtherPayList = () => {

    const params = {
      page_number: -1
    }

    dispatch(getCompanyIncentive({
      params,
      onSuccess: (success: any) => () => {
        setOtherPayData(success?.details)
      },
      onError: (error: any) => () => {

      }
    }));
  }

  const getEmployeeSalaryDefinitionDetails = () => {
    const params = {
      employee_id: selectedEmployeeDetails?.id
    }

    dispatch(getEmployeeSalaryDefinition({
      params,
      onSuccess: (success: any) => () => {
        prefillSalaryDefinitions(success?.details)

      },
      onError: (error: any) => () => {
        if (!error.success) {
          dispatch(isEditEmployeeSalaryDefinition(!isEditSalary))
          setIsDisablePayrollView(true)
        }
      }
    }));
  }

  const getAllowanceDetails = (item: any) => {

    const params = {
      id: item
    }
    dispatch(getAllowanceGroupDetails({
      params,
      onSuccess: (success: any) => () => {
        setAllowanceDetails(success.details?.allowance_break_down?.allowance_items)
      },
      onError: (error: any) => () => {
        showToast('error', error)
        setAllowanceDetails([])
      }
    }));
  }

  const prefillSalaryDefinitions = (salaryDetails: any) => {

    setEditSalaryDefinitionId(salaryDetails?.id)
    setAnnualCTC(salaryDetails.ctc)
    let annualCtc: any = salaryDetails.ctc
    let halfOfTheAnnual: any = 50 / 100 * annualCtc
    let annualCtcPercentage = 1 * annualCtc
    setMinimumAmount(halfOfTheAnnual)
    setMaximumAmount(annualCtcPercentage)
    setAutoDebitPf(salaryDetails?.base_configuration?.auto_calculate_pf)
    setAutoDebitTds(salaryDetails?.base_configuration?.auto_calculate_tds)
    setBasicSalary(salaryDetails.base_salary_percent)
    setAllowanceGroup(salaryDetails?.allowance_break_down?.id)
    getAllowanceDetails(salaryDetails?.allowance_break_down?.id)
    const newKeyAddedArray = salaryDetails?.deductions_group?.map((el: any) => ({ ...el, type: el.is_percent ? "1" : "2", error: '' }))
    setSelectedDefinitionEditData(newKeyAddedArray)
    setSelectedOtherPayData(salaryDetails?.incentives_group)
    setEditSelectedOtherPayData(salaryDetails?.incentives_group)
    setSelectedDeductions(newKeyAddedArray)
    setEdit(true)
  }

  const onTotalCalculator = () => {
    const AllowancePercentage = selectedDeductions?.map((el: any) => {
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

  const isValidBasicSalary = () => {
    let minimumPercentage = 50
    if (annualCTC && !basicSalary) {
      setColor("#000000")
      setIsSubmitDisable(false)
    }

    else if (basicSalary && !annualCTC) {
      setColor("#000000")
      setIsSubmitDisable(false)
    }

    else if (annualCTC && basicSalary) {
      // (basicSalary >= minimumAmount && basicSalary <= maximumAmount)
      if (basicSalary >= minimumPercentage) {
        setColor("#000000")
        setIsSubmitDisable(false)
      }
      else {
        setIsSubmitDisable(true)
        setColor("#FF0000")
      }
    }
  }


  const onDeductionDropdownChangeHandler = (event: string) => {
    const filteredDeduction = companyDeductionsList?.filter((item: any) => event === item.id)
    const newArr = filteredDeduction?.map((el: any) => ({ ...el, percent: '', amount: '', is_percent: false, type: "2", error: '' }))
    setDeductionsData([...deductionsData, ...newArr])
    setSelectedDeductions([...selectedDeductions, ...newArr])
  }


  const onOtherPayChangeHandler = (event: string) => {


    let filteredOtherPay: any = [...selectedOtherPayData]

    const isExists = selectedOtherPayData && selectedOtherPayData.length > 0 && selectedOtherPayData.some((el: any) => event === el.id)

    if (isExists) {
      filteredOtherPay = filteredOtherPay && filteredOtherPay.length > 0 && filteredOtherPay.filter((el: any) => event !== el.id)

    } else {
      const addOtherPay = OtherPayData?.filter((item: any) => item.id === event)
      const addNewKey = { ...addOtherPay[0], amount: '' }
      filteredOtherPay = [...filteredOtherPay, addNewKey]
    }

    setSelectedOtherPayData(filteredOtherPay)
  }

  const onChangeIncentiveHandler = (index: any, value: any) => {
    let updatedAmount = [...selectedOtherPayData]
    updatedAmount[index].amount = value
    setSelectedOtherPayData(updatedAmount)
  }

  const onDeleteOtherPay = (event: any) => {
    const filteredPay = selectedOtherPayData && selectedOtherPayData.length > 0 && selectedOtherPayData.filter((el: any) => event !== el.id)
    setSelectedOtherPayData(filteredPay)
  }

  const onDeleteAllowence = (item: any) => {
    const filteredPeople = selectedDeductions?.filter((it: any) => it.id !== item.id)
    setSelectedDeductions(filteredPeople)
  }

  const onChangeHandler = ((index: number, event: any, minLimit: string | number, maxLimit: string | number) => {
    let updatePercentage = [...selectedDeductions]
    if (updatePercentage[index].type == "1") {
      updatePercentage[index].percent = event.target.value
      updatePercentage[index].amount = 0
      if ((updatePercentage[index].max_limit !== -1 || updatePercentage[index].min_limit !== -1) && updatePercentage[index].type != "1") {

        if (event.target.value > updatePercentage[index].max_limit) {
          updatePercentage[index].error = `* You have exceeded the maximum limit (max ${updatePercentage[index].max_limit})`
        }
        else if (event.target.value < updatePercentage[index].min_limit) {
          updatePercentage[index].error = `* You entered value is lesser than the minimum limit(min ${updatePercentage[index].min_limit})`
        }
        else {
          updatePercentage[index].error = ''
        }
      }
      setSelectedDeductions(updatePercentage)
    }
    else {
      updatePercentage[index].percent = 0
      updatePercentage[index].amount = event.target.value

      if ((updatePercentage[index].max_limit !== -1 || updatePercentage[index].min_limit !== -1) && updatePercentage[index].type != "1") {
        if (event.target.value > updatePercentage[index].max_limit) {
          updatePercentage[index].error = `* You have exceeded the maximum limit (max ${updatePercentage[index].max_limit})`
        }
        else if (event.target.value < updatePercentage[index].min_limit) {
          updatePercentage[index].error = `* You entered value is lesser than the minimum limit(min ${updatePercentage[index].min_limit})`
        }
        else {
          updatePercentage[index].error = ''
        }
      }

      setSelectedDeductions(updatePercentage)
    }

  })

  const validatePostParams = () => {
    if (!annualCTC) {
      showToast('error', 'Cost of the company field should not be empty')
      return false
    }
    else if (!basicSalary) {
      showToast('error', 'Basic salary field should not be empty')
      return false
    }
    else if (!allowanceGroup) {
      showToast('error', 'Please select Allowance group')
      return false
    }
    else if (validateDeduction().status) {
      showToast('error', validateDeduction().errorMessage)
      return false
    }
    else if (validateOtherPay().status) {
      showToast('error', validateOtherPay().errorMessage)
      return false
    }
    else {
      return true
    }
  }

  const validateDeduction = () => {
    let status = { status: false, errorMessage: '' }
    selectedDeductions?.map((item: any) => {
      if (item.amount == '' && (item.percent == 0 || item.percent == '') || item.percent == '' && (item.amount == 0 || item.amount == '')) {
        status = { status: true, errorMessage: `Deduction field should not be empty` }
      }
    })
    return status
  }

  const validateOtherPay = () => {
    let status = { status: false, errorMessage: '' }
    selectedOtherPayData?.map((item: any) => {
      if (item?.amount === '') {
        status = { status: true, errorMessage: `OtherPay field should not be empty` }
      }
    })
    return status
  }


  const modifiedApiKeys = () => {

    const editData = selectedDefinitionEditData.map((el: any) => {
      return {
        id: el.id,
        percent: el.percent,
        amount: el.amount,
        is_percent: el.type == "1" ? true : false
      }
    })

    const newlyAddedDeduction = deductionsData.map((el: any) => {
      return {
        deduction_id: el.id,
        percent: el.percent,
        amount: el.amount,
        is_percent: el.type == "1" ? true : false
      }
    })

    return [...editData, ...newlyAddedDeduction]

  }




  const modifiedOtherPay = () => {
    if (isEditSalary) {
      let editFilterData: any = []
      selectedOtherPayData && selectedOtherPayData.length > 0 && selectedOtherPayData.map((item: any) => {
        if ("incentive_id" in item) {
          editFilterData = [...editFilterData, { id: item.id, amount: parseInt(item.amount) }]
        } else {
          editFilterData = [...editFilterData, {
            incentive_id: item.id
            , amount: parseInt(item.amount)
          }
          ]
        }
      })

      return editFilterData
    } else {
      const filteredOtherPayKeys = selectedOtherPayData?.map((el: any) => {
        return {
          "incentive_id": el.id,
          "amount": parseInt(el.amount)
        }
      })
      return filteredOtherPayKeys
    }
  }

  const onSubmit = () => {

    const filteredApiKeys = selectedDeductions?.map((el: any) => {
      return {
        deduction_id: el.id,
        percent: parseInt(el.percent),
        amount: parseInt(el.amount),
        is_percent: el.type == "1" ? true : false
      }
    })

    const filteredOtherPayKeys = selectedOtherPayData?.map((el: any) => {
      return {
        "incentive_id": el.id,
        "amount": parseInt(el.amount)
      }
    })

    const params = {
      ctc: annualCTC,
      base_salary_percent: basicSalary,
      employee_id: selectedEmployeeDetails.id,
      calendar_year: calendarYear,
      auto_calculate_pf: autoDebitPf,
      auto_calculate_tds: autoDebitTds,
      allowance_break_down_group_id: allowanceGroup,
      deductions_group_ids: isEditSalary ? modifiedApiKeys() : filteredApiKeys ? filteredApiKeys : [],
      incentive_group_ids: isEditSalary ? modifiedOtherPay() : filteredOtherPayKeys ? filteredOtherPayKeys : [],
      ...(isEditSalary && { id: editSalaryDefinitionId })
    }


    if (validatePostParams()) {
      dispatch(addEmployeeSalaryDefinition({
        params,
        onSuccess: (success: any) => () => {
          showToast('success', success.message)
          goBack(navigation)
        },
        onError: (error: any) => () => {
          showToast('error', error)
        }
      }));
    }

  }

  const showAllowanceGroupDetails = (value: any) => {
    setAllowanceGroup(value)
    getAllowanceDetails(value)
  }

  const normalizedAllowanceList = (data: any) => {

    return data.map((el: any, index: number) => {
      return {
        name: el.name,
        'Percent': el?.percent ? el?.percent : '-',
        'Amount': el?.amount ? el?.amount : '-'
      };
    });
  }


  return (
    <ScreenContainer>
      <Card>

        <Container additionClass='d-flex justify-content-between mb-3'>

          <h3>{isEditSalary && !isDisablePayrollView ? 'Edit Employee salary definition' : 'Add Employee salary definition'}</h3>

        </Container>

        <InputText
          label={t("CostOfTheCompany")}
          placeholder={t("CostOfTheCompany")}
          value={annualCTC}
          type={'number'}
          onChange={(event: any) => {
            // let annualCtc: any = event.target.value
            // let halfOfTheAnnual: any = 50 / 100 * annualCtc
            // let annualCtcPercentage = 1 * annualCtc
            // setMinimumAmount(halfOfTheAnnual)
            // setMaximumAmount(annualCtcPercentage)
            setAnnualCTC(event.target.value)
          }}
        />
        <Container>
          <InputDefault
            label={t("BasicSalary (In Percent)")}
            placeholder={t("BasicSalary")}
            value={basicSalary}
            type={'number'}
            onChange={(event: any) => {
              setBasicSalary(inputNumberMaxLength(event.target.value, 2))

            }}
          />
          <h5 className='mt--3 text-right' style={{ color: color }}>{t('MinimumCTC')}</h5>
        </Container>
        <div className="row align-items-center">
          <div className="col mt--2">
            <DropDown
              label={t("AllowanceGroup")}
              placeholder={t("AllowanceGroup")}
              data={allowanceGroupsList}
              value={allowanceGroup}
              onChange={(e) => showAllowanceGroupDetails(e.target.value)}
            />
          </div>
        </div>
        {allowanceDetails && allowanceDetails.length > 0 && 
        <Container additionClass='my-2'>
          <CommonTable
            card={false}
            displayDataSet={normalizedAllowanceList(allowanceDetails)}
          />
        </Container>}
        <div className="mb-3">
          <h3>{'Others Pay'}</h3>
        </div>
        <Container additionClass='col-xl-6'>
          <div className='mt-3  mb-2'>
            {OtherPayData && OtherPayData.length > 0 && OtherPayData.map((element: any) => {
              const isDeductionExist = selectedOtherPayData && selectedOtherPayData?.length > 0 && selectedOtherPayData?.some((item: any) => {
                let match = item?.incentive_id ? item?.incentive_id : item.id
                return match === element?.id
              })

              return (
                <div className='row'>
                  <Container additionClass='d-flex col-auto'>
                    <td className="col-auto col-sm-0 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={isDeductionExist ? Icons.TickActive : Icons.TickDefault} onClick={() => {
                      onOtherPayChangeHandler(element?.id)
                    }} /></td>
                    <Container additionClass='col-auto col-sm-0 my-1'>
                      <h5>{element?.name}</h5>
                    </Container>
                  </Container>
                  <Container additionClass='col   ml-sm-0 ml-4'>
                    {selectedOtherPayData && selectedOtherPayData?.length > 0 && selectedOtherPayData?.map((el: any, i: number) => {

                      const isEditData = editSelectedOtherPayData?.some((item: any) => item.id === el.id)
                      let match = el?.incentive_id ? el?.incentive_id : el.id

                      return (
                        <>
                          <Container additionClass='row'>
                            {match === element.id && (
                              <>
                                <Container additionClass={''}>
                                  <InputNumber
                                    value={el.amount}
                                    additionClass={'col-xl-4'}
                                    onChange={(event: any) => {
                                      onChangeIncentiveHandler(i, event.target.value);
                                    }}
                                  />

                                </Container>
                                <Container additionClass={'col-xl-3 col col-sm-0'}>
                                  <Container additionClass='row '>
                                    <td className='col-xl col col-sm-0 mt-3 ' style={{ whiteSpace: "pre-wrap" }}>
                                      {!isEditData ?
                                        <ImageView icon={Icons.Remove} onClick={() => {
                                          onDeleteOtherPay(el?.id)
                                        }} /> :
                                        <></>
                                      }
                                    </td>
                                  </Container>
                                </Container>
                                <h6 className='text-danger mt--3'>{el.error}</h6>
                              </>
                            )}
                          </Container>
                        </>
                      )
                    })}
                  </Container>
                </div>
              )
            })}
          </div>
        </Container>

        <div className="mb-3">
          <h3>{'Deduction breakdown'}</h3>
        </div>
        <Container additionClass='row'>
          <Container additionClass='col-xl-6'>
            <div className='mt-3  mb-2'>
              {deductionsDropDownData && deductionsDropDownData.length > 0 && deductionsDropDownData.map((element: any) => {
                const isDeductionExist = selectedDeductions && selectedDeductions?.length > 0 && selectedDeductions?.some((item: any) => {
                  let match = item?.deduction_id ? item?.deduction_id : item.id
                  return match === element?.id
                })

                return (
                  <div className='row'>
                    <Container additionClass='d-flex col-auto'>
                      <td className="col-auto col-sm-0 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={isDeductionExist ? Icons.TickActive : Icons.TickDefault} onClick={() => {
                        if (!isDeductionExist) {
                          onDeductionDropdownChangeHandler(element?.id)
                        } else {
                          onDeleteAllowence(element)
                        }
                      }} /></td>
                      <Container additionClass='col-auto col-sm-0 my-1'>
                        <h5>{element?.name}</h5>
                      </Container>
                    </Container>
                    <Container additionClass='col   ml-sm-0 ml-4'>
                      {selectedDeductions && selectedDeductions?.length > 0 && selectedDeductions?.map((el: any, i: number) => {

                        const isEditData = selectedDefinitionEditData?.some((item: any) => item.deduction_id === el.deduction_id)
                        let match = el?.deduction_id ? el?.deduction_id : el.id

                        return (
                          <>
                            <Container additionClass='row'>
                              {match === element.id && (
                                <>
                                  <Container additionClass={''}>
                                    <InputNumber
                                      value={el.type == "1" ? el.percent : el.amount}
                                      additionClass={'col-xl-4'}
                                      onChange={(event: any) => {
                                        onChangeHandler(i, event, el.min_limit, el.max_limit);
                                      }}
                                    />

                                  </Container>
                                  <Container additionClass={'col-xl-3 col col-sm-0'}>
                                    <Container additionClass='row '>
                                      <td className='col-xl col col-sm-0 mt-3 ' style={{ whiteSpace: "pre-wrap" }}>
                                        {!isEditData ?
                                          <ImageView icon={Icons.Remove} onClick={() => {
                                            onDeleteAllowence(el)
                                          }} /> :
                                          <></>
                                        }
                                      </td>
                                    </Container>
                                  </Container>
                                  <h6 className='text-danger mt--3'>{el.error}</h6>
                                </>
                              )}
                            </Container>
                          </>
                        )
                      })}
                    </Container>
                  </div>
                )
              })}
            </div>
          </Container>
          {/* <Container additionClass='col-xl-6 ml-sm-0 ml-4'>
            {selectedDeductions && selectedDeductions?.length > 0 && selectedDeductions?.map((el: any, i: number) => {

              const isEditData = selectedDefinitionEditData?.some((item: any) => item.deduction_id === el.deduction_id)
              return (
                <Container additionClass='row'>
                  <Container additionClass={''}>
                    <InputNumber
                      label={el.name}
                      value={el.type == "1" ? el.percent : el.amount}
                      additionClass={'col-xl-4'}
                      onChange={(event: any) => {
                        onChangeHandler(i, event, el.min_limit, el.max_limit);
                      }}
                    />
                    <h6 className='text-danger mt--3'>{el.error}</h6>
                  </Container>
                  <Container additionClass={'col-xl-3 col col-sm-0'}>
                    <Container additionClass='row mt-4'>
                      <td className='col-xl col col-sm-0 mt-3 ' style={{ whiteSpace: "pre-wrap" }}>
                        {!isEditData ?
                          <ImageView icon={Icons.Remove} onClick={() => {
                            onDeleteAllowence(el)
                          }} /> :
                          <></>
                        }
                      </td>
                    </Container>
                  </Container>
                </Container>
              )
            })}
          </Container> */}
        </Container>
        {/* {isPercentageExist && (
          <h5 className="font-weight-light" style={{ color: remaining < 0 ? "#FF5733" : "#000000" }}>{t('remaining')}<strong className="font-weight-bold" style={{ color: remaining < 0 ? "#FF5733" : "#000000" }}>{remaining + ' %'}</strong></h5>
        )} */}

        {/* <Primary
          size={'btn-sm'}
          text={selectedDeductions.length > 0 ? 'Add another' : 'Add new'}
          onClick={() => {
            setDeduction('')
            setDeductionAddModal(!deductionAddModal)
          }}
        /> */}
        <div className='text-right mt-3'>
          <Primary
            size={'btn-md'}
            disabled={remaining < 0 || isSumbitDisable ? true : false}
            text={isEditSalary ? t('update') : t('submit')}
            onClick={() => onSubmit()}
          />
        </div>
      </Card>
      <Modal
        title={'Select deduction'}
        showModel={deductionAddModal}
        toggle={() => setDeductionAddModal(!deductionAddModal)}
      >
        <Container additionClass='col-6'>
          <DropDown
            label={t("DeductionGroup")}
            placeholder={t("DeductionGroup")}
            data={deductionsDropDownData}
            value={deduction}
            onChange={(e) => {
              setDeduction(e.target.value)
              setDeductionAddModal(!deductionAddModal)

              const isDeductionExist = selectedDeductions && selectedDeductions?.length > 0 && selectedDeductions?.some((item: any) => item.id === e.target.value)
              if (!isDeductionExist) {
                onDeductionDropdownChangeHandler(e.target.value)
              }
            }}
          />
        </Container>
      </Modal>
    </ScreenContainer>
  )
}

export default SalaryBreakDown
