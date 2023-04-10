import { Card, CommonTable, Container, FormTypography, FormWrapper, ScreenContainer } from '@components'
import { getEmployeeSalaryDefinition } from '../../../../store/Payroll/actions';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function ViewEmployeeSalaryDefinition() {

    let dispatch = useDispatch();


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
        <ScreenContainer>
            <Card>
                <h3>{`${selectedEmployeeDetails?.name}'s salary definition`}</h3>

                <Container additionClass={'col-xl-12 row col-sm-3'}>
                    <div className="col-xl-6">
                        <FormTypography title={'Cost of the company'} subTitle={employeeSalaryDefinition?.ctc} />
                    </div>
                    <div className="col-xl-6">
                        <FormTypography title={'Basic salary'} subTitle={employeeSalaryDefinition?.base_salary_percent} />
                    </div>
                </Container>

                <Container additionClass={'col-xl-12 row col-sm-3'}>
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

                {employeeSalaryDefinition?.deductions_group && employeeSalaryDefinition.deductions_group.length > 0 &&
                    <Container additionClass=''>
                        <h5 className={'text-muted ml-3 mt-4'}>{'Deductions'}</h5>
                        <Container additionClass=''>
                            <CommonTable
                                card={false}
                                displayDataSet={normalizedAllowanceList(employeeSalaryDefinition.deductions_group)}

                            />
                        </Container>
                    </Container>
                }

                {/* {employeeSalaryDefinition?.deductions_group && employeeSalaryDefinition.deductions_group.length > 0 && employeeSalaryDefinition.deductions_group.map((el: any) => {
                    return (
                        <Container additionClass={'col-xl-12 row col-sm-3'}>
                            <div className="col-xl-6">
                                <FormTypography title={'Deduction name'} subTitle={el?.name} />
                            </div>
                            <div className="col-xl-6">
                                <FormTypography title={el.is_percent ? 'Percent' : 'Amount'} subTitle={el.is_percent ? el.percent : el.amount} />
                            </div>
                        </Container>
                    )
                })} */}

            </Card>
        </ScreenContainer>
    )
}

export default ViewEmployeeSalaryDefinition