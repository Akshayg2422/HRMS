import { Card, Container, FormWrapper, InputText, Primary, ScreenContainer } from '@components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addCompanyDeduction } from '../../../../store/Payroll/actions';
import { goBack, showToast, useNav } from '@utils';


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


    useEffect(() => {
        if (selectedDeductionDetails) {
            setName(selectedDeductionDetails.name)
            setHint(selectedDeductionDetails.name)
            setMinimumLimit(selectedDeductionDetails.min_limit)
            setMaximumLimit(selectedDeductionDetails.max_limit)
        }
    }, [])

    const validatePostParams = () => {

        if (!name) {
            showToast('error', 'The Deduction name should not be empty')
            return false
        }
        else {
            return true
        }

    }


    const onDeductionAdd = () => {

        const params = {
            name: name,
            hint: hint,
            calendar_year: calendarYear,
            min_limit: minimumLimit ? minimumLimit : -1,
            max_limit: maximumLimit ? maximumLimit : -1,
            ...(selectedDeductionDetails && selectedDeductionDetails && { id: selectedDeductionDetails?.id }),
            
        }

        if (validatePostParams()) {
            dispatch(addCompanyDeduction({
                params,
                onSuccess: (success: any) => () => {
                    goBack(navigation);
                    showToast('success', success.status)
                },
                onError: (error: any) => () => {

                }
            }));
        }

    }

    return (
        <ScreenContainer>
            <Card additionClass='mx--3'>
                <h3 className='mb-3'>{selectedDeductionDetails ? t('editDeduction') : t('AddDeduction')}</h3>
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
                    label={t('minimumLimit')}
                    placeholder={t('minimumLimit')}
                    value={minimumLimit}
                    type={'number'}
                    onChange={(event) => {
                        setMinimumLimit(event.target.value);
                    }}
                />

                <InputText
                    label={t('maximumLimit')}
                    placeholder={t('maximumLimit')}
                    value={maximumLimit}
                    type={'number'}
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