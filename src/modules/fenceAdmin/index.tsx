import { Container, CommonTable, Modal, ImageView, Divider, NoRecordFound, } from '@components'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../dashboard/container'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBranchesList } from '../.././store/location/actions';
import { getEmployeesList , addFenceAdmin} from '../.././store/employee/actions';
import { Icons } from '@assets'

import { goTo, useNav, ROUTE } from '@utils'
import { useTranslation } from 'react-i18next';


type Employee = {
    id?: string;
    name?: string;
    parent_id?: string;
    has_location?: boolean;
    fencing_radius?: number;
    can_update_location?: boolean;
    geo_location_id?: string;
    fence_admin_id?: string
}

function FenceAdmin() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [model, setModel] = useState(false);
    const [selectedEmployeeFenceId, setSelectedEmployeeFenceId] = useState();
    const [selectedBranchId, setSelectedBranchId] = useState();


    const { brancheslist } = useSelector(
        (state: any) => state.LocationReducer
    );

    const { registeredEmployeesList } = useSelector(
        (state: any) => state.EmployeeReducer
    );




    useEffect(() => {
        dispatch(getAllBranchesList({}))
    }, [])


    const normalizedBranchList = (data: any) => {

        return data.map((el: any) => {
            return {
                Branch: el.name
            };
        });
    };


    function getRegisteredFenceAdmin(index: number) {
        const selectedBranch = brancheslist[index];

        console.log(JSON.stringify(selectedBranch) + "=====");
        setSelectedEmployeeFenceId(selectedBranch.fence_admin_id)
        setSelectedBranchId(selectedBranch.id);
        const params = {
            q: "",
            page_number: 1,
            branch_id: selectedBranch.id
        }

        dispatch(getEmployeesList({ params }))
        setModel(!model)
    }


    function addFenchAdminApiHandler(item: Employee) {

        const params = { branch_id: selectedBranchId, employee_id: item.id }
        console.log(JSON.stringify(item));
        dispatch(addFenceAdmin({
            params,
            onSuccess: () => {
                dispatch(getAllBranchesList({}))
                setModel(!model)
            },
            onError: () => {
            },
        }))

    }

    return (
        <>
            <Navbar />
            <Container additionClass='main-content my-3'>
                {brancheslist && brancheslist.length > 0 &&
                    <CommonTable
                        tableTitle={t('fenceAdmin')}
                        displayDataSet={normalizedBranchList(brancheslist)}
                        tableOnClick={(e, index, item) => {
                            getRegisteredFenceAdmin(index)
                        }}
                    />}
            </Container>

            {
                <Modal title={t('selectFenceAdminFromTheListBelow')} showModel={model} toggle={() => setModel(!model)}>
                    {registeredEmployeesList && registeredEmployeesList.length > 0 ? <div className='my-4'>
                        {
                            registeredEmployeesList.map((item: Employee, index: number) => {
                                return (
                                    <div className='row align-items-center mx-4' onClick={() =>addFenchAdminApiHandler(item)}>
                                        <div className='col-8'>
                                            <span className="text-xl text-gray">{item.name}</span>
                                        </div>

                                        <div className='col-4 text-right'>
                                            {item.id === selectedEmployeeFenceId && <ImageView icon={
                                                Icons.TickActive
                                            } />
                                            }
                                        </div>
                                        {index !== registeredEmployeesList.length - 1 && <Divider />}
                                        <></>
                                    </div>
                                );
                            })
                        }
                    </div> : <NoRecordFound />
                    }
                </Modal>
            }
        </>
    )

}

export default FenceAdmin;