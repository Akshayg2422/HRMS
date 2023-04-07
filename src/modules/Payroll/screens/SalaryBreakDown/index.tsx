import { Container, DropDown, FormWrapper, Icon, InputDefault, InputText, ScreenContainer } from '@components'
import { goTo, ROUTE, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  validateBasicSalary
} from "@utils";
import { getAllowanceGroups } from '../../../../store/Payroll/actions';

function SalaryBreakDown() {

  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const [annualCTC, setAnnualCTC] = useState()
  const [basicSalary, setBasicSalary] = useState<any>()
  const [minimumAmount, setMinimumAmount] = useState<any>()
  const [maximumAmount, setMaximumAmount] = useState<any>()
  const [color, setColor] = useState("")

  const { allowanceGroupsList } = useSelector(
    (state: any) => state.PayrollReducer
  );

  useEffect(() => {
    isValidBasicSalary()
    getAllowanceGroupList()

  }, [annualCTC, basicSalary])

  const getAllowanceGroupList = () => {

    const params = {}

    dispatch(getAllowanceGroups({
      params,
      onSuccess: (success: any) => () => {
      },
      onError: (error: any) => () => {

      }
    }));
  }

  const isValidBasicSalary = () => {

    if (annualCTC && !basicSalary) {
      setColor("#000000")
    }
    else if (basicSalary && !annualCTC) {
      setColor("#000000")
    }
    else if (annualCTC && basicSalary) {
      if (basicSalary >= minimumAmount && basicSalary <= maximumAmount) {
        setColor("#000000")
      }
      else {
        setColor("#FF0000")
      }
    }
  }



  return (
    <ScreenContainer>
      <FormWrapper
        isTitle
        title={t('SalaryCalculation')}
        onClick={() => console.log('clicked')}>

        <InputText
          label={t("CostOfTheCompany")}
          placeholder={t("CostOfTheCompany")}
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
              data={allowanceGroupsList.data}
              name={"designation"}
            // onChange={() => }

            />
          </div>
          <Icon
            text={"+"}
            onClick={() => {
              goTo(navigation, ROUTE.ROUTE_ALLOWANCE_GROUP)
            }}
          />
        </div>
        <div className="row align-items-center">
          <div className="col mt--2">
            <DropDown
              label={t("DeductionGroup")}
              placeholder={t("DeductionGroup")}
              // data={}
              name={"designation"}
            // onChange={() => }
            />
          </div>
          <Icon
            text={"+"}
            onClick={() => {
              goTo(navigation, ROUTE.ROUTE_DEDUCTION_GROUP)
            }}
          />
        </div>
      </FormWrapper>
    </ScreenContainer>
  )
}

export default SalaryBreakDown
