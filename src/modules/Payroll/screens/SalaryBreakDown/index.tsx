import { Card, Container, DropDown, FormWrapper, Icon, ImageView, InputDefault, InputNumber, InputText, Modal, Primary, ScreenContainer } from '@components'
import { goBack, goTo, ROUTE, showToast, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  validateBasicSalary
} from "@utils";
import { addEmployeeSalaryDefinition, getAllowanceGroups, getCompanyDeductions, getEmployeeSalaryDefinition, isEditEmployeeSalaryDefinition } from '../../../../store/Payroll/actions';
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



  const { allowanceGroupsList, companyDeductionsList, selectedEmployeeDetails, isEditSalary } = useSelector(
    (state: any) => state.PayrollReducer
  );

  const { userDetails } = useSelector(
    (state: any) => state.AuthReducer
  );


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
        console.log('ooooooooooooooo', success);

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
          setIsDisablePayrollView(true)
        }
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

    setBasicSalary(salaryDetails.base_salary_percent)
    setAllowanceGroup(salaryDetails?.allowance_break_down?.id)
    const newKeyAddedArray = salaryDetails?.deductions_group?.map((el: any) => ({ ...el, deduction_id: el.id, type: el.is_percent ? "1" : "2", error: '' }))
    setSelectedDefinitionEditData(newKeyAddedArray)
    setSelectedDeductions(newKeyAddedArray)

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

    if (annualCTC && !basicSalary) {
      setColor("#000000")
      setIsSubmitDisable(false)

    }
    else if (basicSalary && !annualCTC) {
      setColor("#000000")
      setIsSubmitDisable(false)

    }
    else if (annualCTC && basicSalary) {
      if (basicSalary >= minimumAmount && basicSalary <= maximumAmount) {
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

    const newArr = filteredDeduction?.map((el: any) => ({ ...el, deduction_id: el.id, percent: '', amount: '', is_percent: false, type: "1", error: '' }))

    setSelectedDeductions([...selectedDeductions, ...newArr])

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

  const onSubmit = () => {

    const filteredApiKeys = selectedDeductions?.map((el: any) => {
      return {
        ...(isEditSalary ? { id: el.deduction_id } : { deduction_id: el.deduction_id }),
        percent: el.percent,
        amount: el.amount,
        is_percent: el.type == "1" ? true : false
      }
    })

    const params = {
      ctc: annualCTC,
      base_salary_percent: basicSalary,
      employee_id: selectedEmployeeDetails.id,
      calendar_year: calendarYear,
      allowance_break_down_group_id: allowanceGroup,
      deductions_group_ids: filteredApiKeys ? filteredApiKeys : [],
      ...(isEditSalary && { id: editSalaryDefinitionId })
    }
    console.log(params, 'params++++++++++++++');

    if (validatePostParams()) {

      dispatch(addEmployeeSalaryDefinition({
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
  const isPercentageExist = selectedDeductions && selectedDeductions?.some((item: any) => item.type === "1")


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

            let annualCtc: any = event.target.value
            let halfOfTheAnnual: any = 50 / 100 * annualCtc
            let annualCtcPercentage = 1 * annualCtc
            setMinimumAmount(halfOfTheAnnual)
            setMaximumAmount(annualCtcPercentage)
            setAnnualCTC(event.target.value)

          }}
        />
        <Container>
          <InputDefault
            label={t("BasicSalary")}
            placeholder={t("BasicSalary")}
            value={basicSalary}
            type={'number'}
            onChange={(event: any) => {
              setBasicSalary(event.target.value)
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
              onChange={(e) => setAllowanceGroup(e.target.value)}

            />
          </div>
          {/* <Icon
            text={"+"}
            onClick={() => {
              goTo(navigation, ROUTE.ROUTE_ALLOWANCE_GROUP)
            }}
          /> */}
        </div>
        <div className="mb-3">
          <h3>{'Deduction breakdown'}</h3>
        </div>

        {selectedDeductions && selectedDeductions?.length > 0 && selectedDeductions?.map((el: any, i: number) => {

          const isEditData = selectedDefinitionEditData?.some((item: any) => item.deduction_id === el.deduction_id)
          return (
            <Container additionClass='row'>
              <Container additionClass={'col-xl-5 col col-sm-0'}>
                <InputNumber
                  label={el.name}
                  value={el.type == "1" ? el.percent : el.amount}
                  additionClass={'col-xl-2'}
                  onChange={(event: any) => {
                    onChangeHandler(i, event, el.min_limit, el.max_limit);
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
                      let updatePercentage = [...selectedDeductions]
                      updatePercentage[i].type = e.target.value
                      updatePercentage[i].percent = 0
                      updatePercentage[i].amount = 0
                      setSelectedDeductions(updatePercentage)
                    }}
                  />
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

        {isPercentageExist && (
          <h5 className="font-weight-light" style={{ color: remaining < 0 ? "#FF5733" : "#000000" }}>{t('remaining')}<strong className="font-weight-bold" style={{ color: remaining < 0 ? "#FF5733" : "#000000" }}>{remaining + ' %'}</strong></h5>
        )}

        <Primary
          size={'btn-sm'}
          text={selectedDeductions.length > 0 ? 'Add another' : 'Add new'}
          onClick={() => {
            setDeduction('')
            setDeductionAddModal(!deductionAddModal)
          }}
        />
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
            data={companyDeductionsList}
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
