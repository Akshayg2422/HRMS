import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyShifts } from '../../../../store/shiftManagement/actions';


function MyShiftDetails() {
    let dispatch = useDispatch();
    const { myShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );

    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    useEffect(() => {
        getMyShiftsDetails()
    }, [])

    const getMyShiftsDetails = () => {
        const params = {
            employee_id: '6ca4a593-5aa0-48bf-93d7-a22058c8eb3f'
        }
        dispatch(getMyShifts({ params }));
    }
    console.log('myShifts', myShifts, dashboardDetails);
    return (
        <div>
            list
        </div>
    )
}

export default MyShiftDetails
