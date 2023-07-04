import { Card, CommonDropdownMenu, CommonTable, Container, DatePicker, DropDown, FormTypography, FormWrapper, NoRecordFound, Primary, ScreenContainer } from '@components'
import { getEmployeeEarnings, getEmployeeSalaryDefinition } from '../../../../../../store/Payroll/actions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ROUTE, goTo, useNav, Today, ThisMonth, getServerDateFromMoment, getMomentObjFromServer, getDisplayTimeFromMoment, showToast, getDisplayDateTimeFromMoment, dateFormate } from '@utils';
import { Dropdown } from 'reactstrap';
import { Icons } from '@assets';
import moment from 'moment';


function PayrollView() {
  let dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNav();

  const [consolidatedEarings, setConsolidatedEarings] = useState<any>()

  const MONTHS = [
    {
      id: "0",
      name: "January",
    },
    {
      id: "1",
      name: "February",
    },
    {
      id: "2",
      name: "March",
    },
    {
      id: "3",
      name: "April",
    },
    {
      id: "4",
      name: "May",
    },
    {
      id: "5",
      name: "June",
    },
    {
      id: "6",
      name: "July",
    },
    {
      id: "7",
      name: "August",
    },
    {
      id: "8",
      name: "September",
    },
    {
      id: "9",
      name: "October",
    },
    {
      id: "10",
      name: "November",
    },
    {
      id: "11",
      name: "December",
    }
  ]

  const currentMonth = new Date().getMonth();

  const [monthData, setMonthData] = useState(MONTHS);

  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');

  const [customRange, setCustomRange] = useState({
    dateFrom: startOfMonth,
    dataTo: Today,
  });
  const [customMonth, setCustomMonth] = useState(MONTHS[currentMonth].id);
  const [minData, setMinData] = useState('')
  const [maxDate, setMaxData] = useState('')
  const [salaryCriteria, setSalaryCriteria] = useState<any>()
  const [allowanceCalculatedPay, setAllowanceCalculatedPay] = useState<any>()
  const [deductionsCalculatedPay, setDeductionsCalculatedPay] = useState<any>()
  const [othersCalculatedPay, setOthersCalculatedPay] = useState<any>()

  const [totalEarnings, setTotalEarnings] = useState<any>(0)



  const CARD_DROPDOWN_ITEM = [
    { id: '1', name: `View Payslip`, value: 'PS', image: '' },
  ]

  useEffect(() => {
    const filteredMonth = MONTHS.filter((el: any) => el.id <= currentMonth)
    setMonthData(filteredMonth);
  }, [])



  const { selectedEmployeeDetails, employeeSalaryDefinition } = useSelector(
    (state: any) => state.PayrollReducer
  );

  const { selectedEmployeeId } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const [isDisablePayrollView, setIsDisablePayrollView] = useState(false)

  useEffect(() => {
    getEmployeeSalaryDefinitionDetails()
  }, [])

  useEffect(() => {
    const toSeverDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(customRange.dataTo))
    ).getTime();



    const fromServerDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(customRange.dateFrom))
    ).getTime();
    if (toSeverDate < fromServerDate) {
      showToast('info', t('dateFromToValidation'))
      setCustomRange({ ...customRange, dataTo: "" });
    } else {
      getEarnings()
    }
  }, [customRange.dateFrom, customRange.dataTo]);


  useEffect(() => {
    if (customRange.dateFrom && customRange.dataTo) {
      const endOfMonth = moment(customRange.dateFrom).endOf('month').format('YYYY-MM-DD');
      if (customRange.dataTo > endOfMonth) {
        setCustomRange({ ...customRange, dataTo: endOfMonth });
      }
    }
  }, [customRange.dateFrom, customRange.dataTo])


  useEffect(() => {
    getMonthMinMaxDate(customMonth)
  }, [customMonth])


  const dateTimePickerHandler = (value: string, key: string) => {
    setCustomRange({ ...customRange, [key]: value });
  };


  const getEmployeeSalaryDefinitionDetails = () => {
    const params = {
      employee_id: selectedEmployeeDetails?.id
    }

    dispatch(getEmployeeSalaryDefinition({
      params,
      onSuccess: (success: any) => () => {
      },
      onError: (error: any) => () => {
        if (!error.success) {
          setIsDisablePayrollView(true)
        }
      }
    }));
  }

  const normalizedAllowanceList = (data: any) => {

    return data.map((el: any, index: number) => {
      return {
        name: el.name,
        'Percent': el?.percent ? el?.percent : '',
        'Amount': el?.amount ? el?.amount : ' '
      };
    });
  }


  const normalizedList = (data: any) => {
    return data && data.length > 0 && data.map((el: any) => {
      return {
        name: el.key,
        amount: el.value
      };
    });
  }



  const normalizedOtherPayList = (data: any) => {
    return data && data.length > 0 && data.map((el: any) => {
      return {
        name: el.name,
        amount: el.amount
      };
    });
  }


  function getMonthMinMaxDate(month: any) {
    const year = new Date().getFullYear();
    const date = new Date(year, month, 1);
    const minDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const dateFrom = getServerDateFromMoment(getMomentObjFromServer(minDate))
    const dataTo = getServerDateFromMoment(getMomentObjFromServer(maxDate))
    if (month != currentMonth) {
      setCustomRange({ ...customRange, dateFrom: dateFrom, dataTo: dataTo });
      setMinData(dateFrom)
      setMaxData(dataTo)
    }
    else {
      setCustomRange({ ...customRange, dateFrom: dateFrom, dataTo: Today, });
      setMinData(startOfMonth)
      setMaxData(Today)
    }

  }

  // getEmployeeEarnings
  const getEarnings = () => {
    if (customRange.dateFrom && customRange.dataTo) {
      const params = {
        employee_id: selectedEmployeeDetails?.id,
        date_from: customRange.dateFrom,
        date_to: customRange.dataTo
      }
      dispatch(getEmployeeEarnings({
        params,
        onSuccess: (success: any) => () => {
          getStructuredConsolidatedEarings(success.details)
        },
        onError: (error: any) => () => {

        }
      }));
    }
  }

  const getStructuredConsolidatedEarings = (details: any) => {
    let structuredData = [{ key: 'Total Days', value: details?.break_down?.total }, { key: 'Holiday', value: details?.break_down?.holiday }, { key: 'Present', value: details?.break_down?.present },
    { key: 'Alert', value: details?.break_down?.alert }, { key: 'Absent', value: details?.break_down?.absent }, { key: 'Leaves', value: details?.break_down?.leave }, { key: 'Billable Days', value: details?.break_down?.payable_days }
    ]
    setConsolidatedEarings(structuredData)
    setSalaryCriteria(details?.salary_till_date?.calculated_pay)
    details?.salary_till_date?.calculated_pay.map((el: any) => {
      if (el.key === 'allowance_breakdown') {
        setAllowanceCalculatedPay(el?.value)
      }
    })
    details?.salary_till_date?.calculated_pay.map((el: any) => {
      if (el.key === 'deduction_breakdown') {
        setDeductionsCalculatedPay(el?.value)
      }
    })
    details?.salary_till_date?.calculated_pay.map((el: any) => {
      if (el.key === 'other_income_breakdown') {
        setOthersCalculatedPay(el?.value)
      }
    })
    setTotalEarnings(details?.salary_till_date?.gross_pay_till_date_after_deductions?.toFixed(2))
  }

  const normalizedObjectToArray = (data: any) => {
    return data && Object.entries(data).map(([key, value]) => ({ key, value }));
  }



  return (
    // <ScreenContainer>
    <>
      <Card additionClass='mx-4'>
        <div className='row'>
          <div className="col-lg-3 col-md-4 col-sm-12 mt--1 ">
            <DropDown
              label='Month'
              placeholder='Select month'
              data={monthData}
              value={customMonth}
              onChange={(e) => {
                setCustomMonth(e.target.value)
              }}
            />
          </div>
          <div className='col-sm-3'>
            <h5 className=''>{t("startDate")}</h5>
            <DatePicker
              placeholder={"Select Date"}
              icon={Icons.Calendar}
              minDate={minData}
              maxDate={maxDate}
              iconPosition={"prepend"}
              onChange={(date: string) =>
                dateTimePickerHandler(date, "dateFrom")
              }
              value={customRange.dateFrom}
            />
          </div>
          <div className='col-sm-3'>
            <h5>{t("endDate")}</h5>
            <DatePicker
              placeholder={"Select Date"}
              icon={Icons.Calendar}
              minDate={minData}
              maxDate={maxDate}
              iconPosition={"append"}
              onChange={(date: string) => dateTimePickerHandler(date, "dataTo")}
              value={customRange.dataTo}
            />
          </div>
        </div>
        <h3>{`${dateFormate(customRange.dateFrom)} ${' - '}${dateFormate(customRange.dataTo)}`}</h3>
      </Card>
      <div className='mx-4 row'>
        <Card additionClass='col-xl-5'>
          <h3>{'Attendance'}</h3>
          {
            consolidatedEarings && consolidatedEarings.length > 0 ? consolidatedEarings.map((el: any) => {
              return (
                <div className='row my-3'>
                  <span className={`${el.key === 'Billable Days' && 'h3'} col`}>{el.key} </span>
                  <span className={`${el.key === 'Billable Days' && 'h3'} col-2`}>{el.value} </span>
                </div>
              )
            })
              : <NoRecordFound />
          }
          {salaryCriteria && salaryCriteria.length > 0 && <div className='row'>
            <span className='h3 col'>{'Total Earnings'}</span>
            <span className={`${totalEarnings.length > 1 ? 'col-3' : 'col-2'} h3`}>{totalEarnings}</span>
          </div>}
        </Card>
        <Card additionClass='col ml-xl-3'>
          <h3>{`Salary definition`}</h3>
          {!isDisablePayrollView ? (
            <>
              <Container additionClass={'col-xl-12 row col-sm-3'}>
                <div className="col-xl-6">
                  <FormTypography title={'Cost of the company (Yearly)'} subTitle={employeeSalaryDefinition?.ctc} />
                </div>
                <div className="col-xl-6">
                  <FormTypography title={'Basic salary (In Percent)'} subTitle={employeeSalaryDefinition?.base_salary_percent} />
                </div>
              </Container>

              <Container additionClass={'col-xl-12 row col-sm-3 mb-3'}>
                <div className="col-xl-6">
                  <FormTypography title={'Allowance group name'} subTitle={employeeSalaryDefinition?.allowance_break_down?.name} />
                </div>
              </Container>

              {employeeSalaryDefinition?.allowance_break_down?.allowances && employeeSalaryDefinition?.allowance_break_down?.allowances?.length > 0 &&
                <Container additionClass=''>
                  <h5 className={'text-muted ml-3 mt-2'}>{'Allowances'}</h5>
                  <Container additionClass=''>
                    <CommonTable
                      card={false}
                      displayDataSet={normalizedAllowanceList(employeeSalaryDefinition?.allowance_break_down?.allowances)}
                    />
                  </Container>
                </Container>
              }
              {employeeSalaryDefinition?.incentives_group && employeeSalaryDefinition?.incentives_group?.length > 0 &&
                <Container additionClass=''>
                  <h5 className={'text-muted ml-3 mt-2'}>{'Other Pays'}</h5>
                  <Container additionClass=''>
                    <CommonTable
                      card={false}
                      displayDataSet={normalizedOtherPayList(employeeSalaryDefinition?.incentives_group)}
                    />
                  </Container>
                </Container>
              }
              {employeeSalaryDefinition?.deductions_group && employeeSalaryDefinition.deductions_group.length > 0 &&
                <Container additionClass=''>
                  <h5 className={'text-muted ml-3 mt-4'}>{'Deductions'}</h5>
                  <Container>
                    <CommonTable
                      card={false}
                      displayDataSet={normalizedAllowanceList(employeeSalaryDefinition.deductions_group)}
                    />
                  </Container>
                </Container>
              }
            </>) :
            <>
              <Container additionClass='text-right'>
                <Primary
                  text={t('add')}
                  onClick={() => {
                    goTo(navigation, ROUTE.ROUTE_SALARY_BREAK_DOWN);
                    setIsDisablePayrollView(false)
                  }}
                  size={"btn-sm"}
                />
              </Container>
              <NoRecordFound />
            </>}
        </Card>
      </div>
      <Card additionClass='mx-4'>
        <h3>{`Payable's`}</h3>
        {salaryCriteria && salaryCriteria.length > 0 ?
          <div>
            <div className='row'>
              {salaryCriteria && salaryCriteria.length > 0 && salaryCriteria.map((el: any) => {
                return (
                  <div className='col'>
                    {el?.key !== "allowance_breakdown" && el?.key !== "deduction_breakdown" && el.key !== 'other_income_breakdown' &&
                      <FormTypography title={el?.title} subTitle={el?.value} />
                    }
                  </div>
                )
              })
              }
            </div>
            <div className='col ml--3 mt-3'>
              <Container additionClass='m-0 p-0'>
                <h4 className={'text-black'}>{'Allowances'}</h4>
                {allowanceCalculatedPay && normalizedObjectToArray(allowanceCalculatedPay).length > 0 &&
                  <CommonTable
                    card={false}
                    displayDataSet={normalizedList(normalizedObjectToArray(allowanceCalculatedPay))}
                  />
                }
              </Container>
              {othersCalculatedPay && normalizedObjectToArray(othersCalculatedPay).length > 0 && <Container additionClass='m-0 p-0 mt-2'>
                <h4 className={'text-black'}>{'Other Pays'}</h4>
                {othersCalculatedPay && normalizedObjectToArray(othersCalculatedPay).length > 0 &&
                  <CommonTable
                    card={false}
                    displayDataSet={normalizedList(normalizedObjectToArray(othersCalculatedPay))}
                  />
                }
              </Container>}
              <Container additionClass='m-0 p-0 mt-2'>
                <h4 className={'text-black'}>{'Deductions'}</h4>
                {deductionsCalculatedPay && normalizedObjectToArray(deductionsCalculatedPay).length > 0 &&
                  <CommonTable
                    card={false}
                    displayDataSet={normalizedList(normalizedObjectToArray(deductionsCalculatedPay))}
                  />
                }
              </Container>
            </div>
          </div>
          : <NoRecordFound />
        }
      </Card>
    </>

    // </ScreenContainer>
  )
}

export default PayrollView