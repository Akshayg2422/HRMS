import { ScreenContainer, InputText, Container, Card, InputNumber, DropDown, ImageView, Primary, CommonDropdownMenu, Secondary, CheckBox } from '@components'
import { setCompanyIncentive } from '../../../../store/Payroll/actions';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, showToast, useNav } from '@utils';

function OtherPayCreate() {
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const navigation = useNav();


    const { selectedIncentiveDetails, } = useSelector(
        (state: any) => state.PayrollReducer
    );

    const [groupName, setGroupName] = useState<any>()
    const [isTaxable, setIsTaxable] = useState(false)
    const calendarYear = '2023-12-31'

    // setCompanyIncentive

    useEffect(() => {
        if (selectedIncentiveDetails) {
            setGroupName(selectedIncentiveDetails?.name)
            setIsTaxable(selectedIncentiveDetails?.is_taxable)
        }
    }, [])

    const validateAddParams = () => {

        if (!groupName) {
            showToast('error', 'Name should not be empty')
            return false
        }
        else {
            return true
        }
    }

    const addCompanyIncentive = () => {
        if (validateAddParams()) {
            const params = {
                ...(selectedIncentiveDetails && { id: selectedIncentiveDetails?.id }),
                name: groupName,
                calendar_year: calendarYear,
                is_taxable: isTaxable,
            }

            dispatch(setCompanyIncentive({
                params,
                onSuccess: (success: any) => () => {
                    showToast('success', success?.status)
                    goBack(navigation);
                },
                onError: (error: any) => () => {
                    showToast('error', error?.error_message)
                }
            }));
        }
    }

    return (
        <ScreenContainer>
            <Card additionClass='d-flex'>
                <Container additionClass='my-2'>
                    <h3>{selectedIncentiveDetails ? "Edit other Pay" : 'Create Other Pay'}</h3>
                </Container>
                <Container additionClass='col-xl-5 ml-3'>
                    <InputText
                        label={t("Name")}
                        placeholder={t("Name")}
                        value={groupName}
                        onChange={(event) => {
                            setGroupName(event.target.value)
                        }}
                    />
                    <Container additionClass='text-right mt--3'>
                        <CheckBox
                            id={'2'}
                            checked={isTaxable}
                            text={t('isTaxable')}
                            onChange={(e) => { setIsTaxable(e.target.checked) }}
                        />
                    </Container>

                </Container>

                <Container margin={"mt-5"} additionClass={"text-right"}>
                    <Primary
                        text={selectedIncentiveDetails ? t('update') : t("submit")}
                        onClick={() => addCompanyIncentive()}
                    />
                </Container>
            </Card>
        </ScreenContainer >
    )
}

export default OtherPayCreate
