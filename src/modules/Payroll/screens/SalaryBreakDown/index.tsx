import { Container, DropDown, FormWrapper, Icon, InputDefault, InputText } from '@components'
import { goTo, ROUTE, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  validateBasicSalary
} from "@utils";

function SalaryBreakDown() {

  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const [annualCTC, setAnnualCTC] = useState()
  const [basicSalary, setBasicSalary] = useState<any>()
  const [minimumAmount, setMinimumAmount] = useState<any>()
  const [color, setColor] = useState("")


  const isValidBasicSalary = (value: any) => {
    
    if (!annualCTC) {
      setColor("#000000")
      setBasicSalary(value)
    }
    else if(annualCTC && value >= minimumAmount){
      console.log("111",value,"222",minimumAmount);
      
      setColor("#000000")
      setBasicSalary(value)

    }
    else if(annualCTC && value < minimumAmount){
      console.log("333",value,"444",minimumAmount);

      setColor("#FF0000")
    }
  }


  return (
    <>
      <FormWrapper
        title={t('SalaryCalculation')}
        onClick={() => console.log('clicked')}>

        <InputText
          label={t("CostOfTheCompany")}
          placeholder={t("CostOfTheCompany")}
          onChange={(event: any) => {

            let annualCtc: any = event.target.value
            let halfOfTheAnnual: any = 50 / 100 * annualCtc
            if(!basicSalary){
              setMinimumAmount(halfOfTheAnnual)
              setAnnualCTC(event.target.value)
            }
            else if(basicSalary && basicSalary >= halfOfTheAnnual){
              setColor("#000000")
            }
            else if(basicSalary && basicSalary < halfOfTheAnnual){
              setColor("#FF0000")
            }
           
          }}
        />
        <Container>
          <InputDefault
            label={t("BasicSalary")}
            placeholder={t("BasicSalary")}
            onChange={(event: any) => {
              isValidBasicSalary(event.target.value)
            }}
          />
          <h5 className='mt--3 text-right' style={{ color: color }}>{t('MinimumCTC')}</h5>
        </Container>
        <div className="row align-items-center">
          <div className="col mt--2">
            <DropDown
              label={t("AllowanceGroup")}
              // data={}
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
      </FormWrapper>
    </>
  )
}

export default SalaryBreakDown
