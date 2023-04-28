import { Card, Container, Icon, Input, Primary } from '@components'
import { Icons } from "@assets";
import { WEEK_DAY_LIST, getWeekAndWeekDaysById, getMomentObjFromServer, getDisplayTimeFromMoment, getDateFormat, formatAMPM } from '@utils';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


interface props {
  datesList?: any;
  onCheckBoxClick?: (index: number) => void;
  onDeleteClick?: (el: any, index: number) => void;
  onAddClick?: (index: number) => void;
  onSubmit?: () => void;
  showButton?: boolean
}

const WeekDaysList = ({ datesList, onCheckBoxClick, onAddClick, onDeleteClick, onSubmit, showButton = true }: props) => {

  const { t } = useTranslation();

  const { selectedWeeklyShiftId } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );

  const listingWeekDays = (it: any, index: number) => {
    return (
      <Container additionClass='row my-5'>
        <Container additionClass={'col-lg-2 mt-2'}>
          <h4>{getWeekAndWeekDaysById(WEEK_DAY_LIST, 'id', it.week_day + '').name}</h4>
        </Container>
        <Container additionClass={'col-lg-2  mt-2'}> <label className="custom-toggle">
          <input type="checkbox"
            onChange={() => { if (onCheckBoxClick) { onCheckBoxClick(index) } }}
            checked={it.is_working}
            value={getWeekAndWeekDaysById(WEEK_DAY_LIST, 'id', it.week_day + '').name}
          />
          <span
            className="custom-toggle-slider rounded-circle"
            data-label-off="No"
            data-label-on="Yes">
          </span>
        </label>
        </Container>
        <Container additionClass={'col mt-2'}>
          {it.is_working === true ?
            <Container>
              <Primary text={'+'} onClick={() => { if (onAddClick) { onAddClick(index) } }}
              ></Primary>
            </Container> : <Container>
              <h4>{t('notWorking')}</h4>
            </Container>}
        </Container >
        {it.is_working && <Container additionClass={'col-lg-6 row '}>
          {it?.time_breakdown && it.time_breakdown.length > 0 && it.time_breakdown.map((el: any, index: number) => {
            return (
              <>
                <Input disabled={true} label={'IN'} value={formatAMPM(el.start_time)} col={'col-xl-4 col-sm-0 col-5'} />
                <Input disabled={true} label={'Out'} value={formatAMPM(el.end_time)} col={'col-xl-4 col-sm-0 col-5'} />
                <Container col={'col-xl-4 col-sm-0 col-2 ml-sm-0'} style={{ marginTop: "34px" }}>
                  <Icon
                    height={20}
                    width={20}
                    icon={Icons.Delete}
                    onClick={() => { if (onDeleteClick) { onDeleteClick(it, index) } }}
                  />
                </Container>
              </>
            )
          })}

        </Container>}
      </Container>
    )
  }

  return (
    <>
      {datesList && datesList.is_working && (
        <div>
          <Container additionClass='col-lg-12  px-3'>
            {datesList.week_calendar && datesList.week_calendar.length > 0 && datesList.week_calendar.map((it: any, index: number) => {
              return listingWeekDays(it, index)
            })}
          </Container>
          {/* {showButton && <Container>
            <div className="row col-lg-4 ml-4 mt-5 mb-3 float-right">
              <Primary
                text={selectedWeeklyShiftId ? t('update') : t('submit')}
                onClick={onSubmit}
              />
            </div>
          </Container>} */}
        </div>

      )}
    </>
  )
}

export { WeekDaysList }