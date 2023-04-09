import { Card, Container, FormTypography, FormWrapper, ScreenContainer } from '@components'
import { getEmployeeSalaryDefinition } from '../../../../store/Payroll/actions';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function ViewEmployeeSalaryDefinition() {

    let dispatch = useDispatch();


    const { selectedEmployeeDetails, employeeSalaryDefinition } = useSelector(
        (state: any) => state.PayrollReducer
    );

    console.log("selectedEmployeeDetails--->", selectedEmployeeDetails);
    console.log("employeeSalaryDefinition", employeeSalaryDefinition);


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

    return (
        <ScreenContainer>
            <Card>
                <h3>{`${selectedEmployeeDetails.name}'s salary definition`}</h3>

                <Container additionClass={'col-xl-12 row col-sm-3'}>
                    <div className="col-xl-6">
                        <FormTypography title={'Cost of the company'} subTitle={employeeSalaryDefinition.ctc} />
                    </div>
                    <div className="col-xl-6">
                        <FormTypography title={'Basic salary'} subTitle={employeeSalaryDefinition.base_salary_percent} />
                    </div>
                </Container>

                <Container additionClass={'col-xl-12 row col-sm-3'}>
                    <div className="col-xl-6">
                        <FormTypography title={'Allowance group name'} subTitle={employeeSalaryDefinition.allowance_break_down.name} />
                    </div>
                </Container>

                {employeeSalaryDefinition.allowance_break_down.allowances.map((el: any) => {
                    return (
                        <Container additionClass={'col-xl-12 row col-sm-3'}>
                            <div className="col-xl-6">
                                <FormTypography title={'Allowance name'} subTitle={el.name} />
                            </div>
                            <div className="col-xl-6">
                                <FormTypography title={el.is_percent ? 'Percent' : 'Amount'} subTitle={el.is_percent ? el.percent : el.amount} />
                            </div>
                        </Container>
                    )
                })}

                {employeeSalaryDefinition.deductions_group.map((el: any) => {
                    return (
                        <Container additionClass={'col-xl-12 row col-sm-3'}>
                            <div className="col-xl-6">
                                <FormTypography title={'Deduction name'} subTitle={el.name} />
                            </div>
                            <div className="col-xl-6">
                                <FormTypography title={el.is_percent ? 'Percent' : 'Amount'} subTitle={el.is_percent ? el.percent : el.amount} />
                            </div>
                        </Container>
                    )
                })}



            </Card>
        </ScreenContainer>
    )
}

export default ViewEmployeeSalaryDefinition