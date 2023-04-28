
import { Card, Container, Divider, Icon, Input, NoRecordFound, Primary } from '@components'
import { Icons } from "@assets";
import { WEEK_DAY_LIST, getWeekAndWeekDaysById, formatAMPM } from '@utils';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


interface props {
  datesList: any;
}

const EmployeeShiftListing = ({ datesList }: props) => {
  const { t } = useTranslation();

  const listingWeekDays = (it: any, index: number) => {
    return (
      <Container additionClass='row align-items-center'>
        <Container additionClass={'col-xl-2'}>
          <h4 className='fw-bold'>{getWeekAndWeekDaysById(WEEK_DAY_LIST, 'id', it?.week_day + '').name}</h4>
        </Container>
        {it?.is_working ? <Container additionClass={'col-xl-4 my-3'}>
          {it?.time_breakdown && it?.time_breakdown.length > 0 ? it?.time_breakdown.map((el: any, index: number) => {
            return (
              <>
                 <Container additionClass='row ml-1 m-0'>
                  <h4 className='col'>{formatAMPM(el?.start_time)}</h4>
                  <h4 className='col ml-xl--5'>{'To'}</h4>
                  <h4 className='col ml-xl--7'>{formatAMPM(el?.end_time)}</h4>
                </Container>
              </>
            )
          }) : <h4 className='row m-0 ml-3 ml-xl-3 ml-sm-0 mt-1'>{t('notWorking')}</h4>}
        </Container> : <Container additionClass={'col ml-3 ml-xl-3 ml-sm-0'} > <h4>{t('notWorking')}</h4></Container>}
        <Divider />
      </Container>
    )
  }

  return (
    <>
          <Container additionClass='col-lg-12  mt-6 px-3'>
            {datesList?.week_calendar && datesList?.week_calendar.length > 0 && datesList?.week_calendar.map((it: any, index: number) => {
              return listingWeekDays(it, index)
            })}
          </Container>
    </>
  )
}

export { EmployeeShiftListing }