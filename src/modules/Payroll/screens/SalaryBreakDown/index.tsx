import { Container, DropDown, FormWrapper, Icon, InputText } from '@components'
import { goTo, ROUTE, useNav } from '@utils';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

function SalaryBreakDown() {

  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();


  return (
    <>
      <FormWrapper
        title={t('SalaryCalculation')}
        onClick={() => console.log('clicked')}>

        <InputText
          label={t("CostOfTheCompany")}
          name={"firstName"}
          onChange={(event) => {
            // onChangeHandler(event);
          }}
        />
        <Container>
          <InputText
            label={t("BasicSalary")}
            name={"lastName"}
            onChange={(event) => {
              // onChangeHandler(event);
            }}
          />
          <h5 className='mt--3 text-right'>{t('MinimumCTC')}</h5>
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
