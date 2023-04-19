import { Card, CommonTable, Container, DatePicker, FormTypography, FormWrapper, NoRecordFound, Primary, ScreenContainer } from '@components'
import { getEmployeeSalaryDefinition } from '../../../../../../store/Payroll/actions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ROUTE, goTo, useNav,Today,  getServerDateFromMoment, getMomentObjFromServer,getDisplayTimeFromMoment,showToast } from '@utils';
import { Dropdown } from 'reactstrap';
import { Icons } from '@assets';
import moment from 'moment';

function PayrollView() {

    //const sampleData = [{ name: "Total Days", days: "17" }, { name: "Working Days", days: "17" }, { name: "Holidays", days: "0" }, { name: "leaves (UnPaid) ", days: "0" }]
    
 
  /*  const [customRange, setCustomRange] = useState({
        dateFrom: Today,
        dataTo: Today,
      }); */

   // const [customselectedDate, setCustomSelectedDate] = useState(Today);
    let dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useNav();



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

 /*
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
    }
  }, [customRange.dateFrom, customRange.dataTo]);

  useEffect(() => {


    if (customRange.dateFrom && customRange.dataTo) {
      const startOfMonth = moment(customRange.dateFrom).startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment(customRange.dateFrom).endOf('month').format('YYYY-MM-DD');

      if (customRange.dataTo > endOfMonth) {
        setCustomRange({ ...customRange, dataTo: endOfMonth });
      }

    }

  }, [customRange.dateFrom, customRange.dataTo])


  const dateTimePickerHandler = (value: string, key: string) => {

    setCustomRange({ ...customRange, [key]: value });
  };
 */



    const getEmployeeSalaryDefinitionDetails = () => {

        //getEmployeeSalaryDefinition
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
                [el.is_percent ? 'Percent' : 'Amount']: el.is_percent ? el?.percent : el?.amount
            };
        });
    }

    return (
        // <ScreenContainer>
        <>
           {/* <Card additionClass='mx-4'>
                <div className='row'>
                <div className="col-lg-3 col-md-4 col-sm-12 ">
                  <h5>{"Earnings from month"}</h5>
                  <DatePicker
                    placeholder={"date"}
                    icon={Icons.Calendar}
                    maxDate={Today}
                    iconPosition={"prepend"}
                    value={customselectedDate}
                    onChange={(date: string) =>
                      setCustomSelectedDate(
                        getServerDateFromMoment(getMomentObjFromServer(date))
                      )
                    }
                  />
                </div>
                <div className='col-sm-3'>
              <h5 className=''>{t("startDate")}</h5>
              <DatePicker
                placeholder={"Select Date"}
                icon={Icons.Calendar}
                maxDate={Today}
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
                maxDate={Today}
                iconPosition={"append"}
                onChange={(date: string) => dateTimePickerHandler(date, "dataTo")}
                value={customRange.dataTo}
              />
            </div>
     
                </div>
                <h3> Earnings Till Date </h3>
                {
                    sampleData.map((el: any) => {
                        return (
                            <div className='row my-3'>
                                <span className='col-6'>{el.name} </span>
                                <span className='col-6'>{el.days} </span>
                            </div>
                        )

                    })
                }
                <div className='row my-3'>
                    <span className='h3 col-6'> Payable Days </span>
                    <span className='col-6'> 0 </span>
                </div>

            </Card> */}

            <Card additionClass='mx-4'>
                {!isDisablePayrollView ? (
                    <>
                        <h3>{`${selectedEmployeeDetails?.name} 'salary definition`}</h3>

                        <Container additionClass={'col-xl-12 row col-sm-3'}>
                            <div className="col-xl-6">
                                <FormTypography title={'Cost of the company'} subTitle={employeeSalaryDefinition?.ctc} />
                            </div>
                            <div className="col-xl-6">
                                <FormTypography title={'Basic salary'} subTitle={employeeSalaryDefinition?.base_salary_percent} />
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
                                <Container additionClass='mx--4'>
                                    <CommonTable
                                        card={false}
                                        displayDataSet={normalizedAllowanceList(employeeSalaryDefinition?.allowance_break_down?.allowances)}

                                    />
                                </Container>
                            </Container>
                        }

                        {employeeSalaryDefinition?.deductions_group && employeeSalaryDefinition.deductions_group.length > 0 &&
                            <Container additionClass=''>
                                <h5 className={'text-muted ml-3 mt-4'}>{'Deductions'}</h5>
                                <Container additionClass='mx--4'>
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
        </>

        // </ScreenContainer>
    )
}

export default PayrollView