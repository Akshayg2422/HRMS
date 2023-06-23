import { BackArrow, Container, Card, CommonTable, NoRecordFound, Primary, Modal, Secondary, Input, InputText, InputNumber } from '@components';
import { getEmployeeBranchLeaveType, getLeaveFromDate, getLeaveTypes, getLeaveTypesDetails, updateEmployeeAllocatedDays } from '../../../../../../store/employee/actions';
import { goTo, ROUTE, showToast, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

function ManageEmployeeLeaveTypes() {


    const {
        selectedEmployeeId,
    } = useSelector((state: any) => state.EmployeeReducer);

    const navigation = useNav();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [leaveTypes, setLeaveTypes] = useState('')
    const [editModel, setEditModel] = useState(false)
    const [editDetails, setEditDetails] = useState<any>('')
    const [allocatedDays, setAllocatedDays] = useState('')


    useEffect(() => {
        fetchLeaveTypes()
    }, [])


    const fetchLeaveTypes = () => {
        const params = {
            id: selectedEmployeeId
        };
        dispatch(
            getEmployeeBranchLeaveType({
                params,
                onSuccess: (success: any) => () => {
                    setLeaveTypes(success?.details?.leave_types);
                },
                onError: (error: string) => () => {
                    showToast("error", error);
                },
            })
        );
    };

    const normalizedEmployeeLog = (data: any) => {
        return data && data.length > 0 && data.map((el: any) => {
            return {
                "Name": el?.name,
                "Allocated Days": el?.allocated_days,
                "edit": <><h5 style={{ cursor: 'pointer' }} onClick={() => editOnClick(el)} className='text-primary'>{t('edit')}</h5></>,
                "Available Days": el?.available_days,
            };
        });
    };

    const editOnClick = (item: any) => {
        setEditDetails(item)
        setEditModel(true)
        setAllocatedDays(item?.allocated_days)
    }


    const changeEmployeeAllocatedDays = () => {

        if (allocatedDays === '') {
            showToast("error", t('please enter valid number'));
            return
        }

        const params = {
            id: selectedEmployeeId,
            leave_type_id: editDetails?.leave_type_id,
            altered_days_count: parseInt(allocatedDays)
        };

        dispatch(
            updateEmployeeAllocatedDays({
                params,
                onSuccess: (success: any) => () => {
                    // setLeaveTypes(success?.message);
                    setEditModel(!editModel)
                    showToast("info", success?.message);
                    fetchLeaveTypes()
                },
                onError: (error: string) => () => {
                    showToast("error", error);
                },
            })
        );
    };


    const memoizedTable = useMemo(() => {
        return <>
            {leaveTypes && leaveTypes.length > 0 ? (
                <CommonTable
                    title={t("AvailableLeaves")}
                    displayDataSet={normalizedEmployeeLog(leaveTypes)}
                // tableOnClick={(e, index, item) => {
                //   const selectedId = registeredEmployeesList[index].id;
                //   dispatch(getSelectedEmployeeId(selectedId));
                //   goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS);
                // }}
                />
            ) : <NoRecordFound />}
        </>
    }, [leaveTypes])
    // allocated_days

    return (
        <>
            <Container additionClass={"mt-5 main-contain mx-4"}>
                <Container additionClass='mt-5'>
                    {
                        memoizedTable
                    }
                </Container>
            </Container>
            <Modal
                title={t("edit")}
                size='modal-sm'
                showModel={editModel}
                toggle={() => setEditModel(!editModel)}
            >
                <Container>
                    <Container>
                        <InputNumber
                            label={t('Allocated Days')}
                            value={allocatedDays}
                            onChange={(e) => setAllocatedDays(e.target.value)}
                        />
                    </Container>
                    <Container
                        margin={"m-1"}
                        justifyContent={"justify-content-end"}
                        display={"d-flex"}
                    >
                        <Secondary
                            text={t("cancel")}
                            onClick={() => setEditModel(!editModel)}
                        />
                        <Primary
                            text={t("update")}
                            onClick={() => {
                                // getBroadcastMessagesList(currentPage)
                                changeEmployeeAllocatedDays()
                            }}
                        />
                    </Container>
                </Container>
            </Modal>
        </>
    )
}

export default ManageEmployeeLeaveTypes
