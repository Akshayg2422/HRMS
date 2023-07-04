import { Card, CommonTable, Container, FormTypography, FormWrapper, NoRecordFound, ScreenContainer } from '@components'
import { getEmployeeSalaryDefinition } from '../../../../store/Payroll/actions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function ViewEmployeeSalaryDefinition() {

    let dispatch = useDispatch();

    const [isDisablePayrollView, setIsDisablePayrollView] = useState(false)

    const { selectedEmployeeDetails, employeeSalaryDefinition } = useSelector(
        (state: any) => state.PayrollReducer
    );


    useEffect(() => {
        getEmployeeSalaryDefinitionDetails()
    }, [])


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


    const normalizedOtherPayList = (data: any) => {

        return data.map((el: any, index: number) => {
            return {
                name: el.name,
                'Amount': el?.amount
            };
        });
    }

    return (
        <div className='scroll-hidden' style={{ overflow: 'auto', height: '90vh', }}>
            {!isDisablePayrollView ? (
                <Card>
                    <h3>{`${selectedEmployeeDetails?.name}'s salary definition`}</h3>
                    <Container additionClass={'col-xl-12 row col-sm-3'}>
                        <div className="col-xl-6">
                            <FormTypography title={'Cost of the company (Yearly)'} subTitle={employeeSalaryDefinition?.ctc} />
                        </div>
                        <div className="col-xl-6">
                            <FormTypography title={`Basic salary (In Percent)`} subTitle={employeeSalaryDefinition?.base_salary_percent} />
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
                    {employeeSalaryDefinition?.incentives_group && employeeSalaryDefinition.incentives_group.length > 0 &&
                        <Container additionClass=''>
                            <h5 className={'text-muted ml-3 mt-4'}>{'Other Pays'}</h5>
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
                            <Container additionClass=''>
                                <CommonTable
                                    card={false}
                                    displayDataSet={normalizedAllowanceList(employeeSalaryDefinition?.deductions_group)}

                                />
                            </Container>
                        </Container>
                    }
                </Card>
            ) : <Card> <NoRecordFound /></Card>
            }
        </div>
    )
}

export default ViewEmployeeSalaryDefinition