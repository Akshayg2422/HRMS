import { Card, CommonTable, Container, FormTypography, FormWrapper, NoRecordFound, Primary, ScreenContainer } from '@components'
import { getEmployeeSalaryDefinition } from '../../../../../../store/Payroll/actions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ROUTE, goTo, useNav } from '@utils';

function PayrollView() {

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
        // </ScreenContainer>
    )
}

export default PayrollView