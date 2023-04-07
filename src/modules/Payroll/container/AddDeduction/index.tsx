import { Card, Container, FormWrapper, InputText, Primary, ScreenContainer } from '@components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addCompanyDeduction } from '../../../../store/Payroll/actions';
import { goBack, useNav } from '@utils';


function AddDeduction() {

    const { t } = useTranslation();
    let dispatch = useDispatch();
    const navigation = useNav();

    const { selectedDeductionDetails } = useSelector(
        (state: any) => state.PayrollReducer
    );

    const [name, setName] = useState('')
    const [hint, setHint] = useState('')
    const [maximumLimit, setMaximumLimit] = useState('')
    const [minimumLimit, setMinimumLimit] = useState('')
    const calendarYear = '2023-12-31'
    console.log("selectedDeductionDetails", selectedDeductionDetails);


    useEffect(() => {
        if (selectedDeductionDetails) {
            setName(selectedDeductionDetails.name)
            setHint(selectedDeductionDetails.name)
            setMinimumLimit(selectedDeductionDetails.min_limit)
            setMaximumLimit(selectedDeductionDetails.max_limit)
        }
    }, [])


    const onDeductionAdd = () => {

        const params = {
            name: name,
            hint: hint,
            calendar_year: calendarYear,
            min_limit: minimumLimit,
            max_limit: maximumLimit ? maximumLimit : -1,
            ...(selectedDeductionDetails && selectedDeductionDetails && { id: selectedDeductionDetails?.id })
        }


        dispatch(addCompanyDeduction({
            params,
            onSuccess: (success: any) => () => {
                console.log("success--->", success);
                goBack(navigation);
            },
            onError: (error: any) => () => {

            }
        }));


    }

    return (
        <ScreenContainer>
            <Card additionClass='mx--3'>
                <h3 className='mb-3'>{selectedDeductionDetails ? 'Edit deduction' : 'Add Deduction'}</h3>
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

                <InputText
                    label={'Minimum limit'}
                    placeholder={'Minimum limit'}
                    value={minimumLimit}
                    onChange={(event) => {
                        setMinimumLimit(event.target.value);
                    }}
                />

                <InputText
                    label={'Maximum limit'}
                    placeholder={'Maximum limit'}
                    value={maximumLimit}
                    onChange={(event) => {
                        setMaximumLimit(event.target.value);
                    }}
                />

                <Container margin={"mt-5"} additionClass={"text-right"}>

                    <Primary
                        text={selectedDeductionDetails ? t('update') : t("submit")}
                        onClick={() => onDeductionAdd()}
                    />
                </Container>
            </Card>
        </ScreenContainer>
    )
}

export default AddDeduction