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

    const { registeredEmployeesList, numOfPages, currentPage  } = useSelector(
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


    function getRegisteredFenceAdmin(pageNumber: number) {

        const params = {
            q: "",
            page_number: pageNumber,
            branch_id: selectedBranchId
        }   
        dispatch(getEmployeesList({ params }))
    }


    function getRegisteredFenceAdminDefault(id: string, pageNumber: number) {
        const params = {
            q: "",
            page_number: pageNumber,
            branch_id: id
        }
        dispatch(getEmployeesList({ params }))
    }



    function paginationHandler(type: 'next' | 'prev' | 'current', position?: number) {
        let page = type === 'next' ? currentPage + 1 : type === 'prev' ? currentPage - 1 : position;
        getRegisteredFenceAdmin(page)
    }

    function addFenceAdminApiHandler(item: Employee) {
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

    function proceedModelHandler(index: number) {
        const selectedBranch = brancheslist[index];
        setSelectedEmployeeFenceId(selectedBranch.fence_admin_id)
        setSelectedBranchId(selectedBranch.id);
        getRegisteredFenceAdminDefault(selectedBranch.id,currentPage);
        setModel(!model)
        
    }

    return (
        <>
            {
                brancheslist && brancheslist.length > 0 &&
                <CommonTable
                    tableTitle={t('fenceAdmin')}
                    displayDataSet={normalizedBranchList(brancheslist)}
                    tableOnClick={(e, index, item) => {
                        proceedModelHandler(index);
                    }}
                />
            }

            {
                <Modal title={t('selectFenceAdminFromTheListBelow')} showModel={model} toggle={() => setModel(!model)}>
                    {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
                        <CommonTable
                            noHeader
                            isPagination
                            currentPage={currentPage}
                            noOfPage={numOfPages}
                            paginationNumberClick={(currentPage) => { paginationHandler('current', currentPage) }}
                            previousClick={() => paginationHandler('prev')}
                            nextClick={() => paginationHandler('next')}
                            tableChildren={
                                <EmployeeTable
                                    employeeFenceId={selectedEmployeeFenceId}
                                    tableDataSet={registeredEmployeesList}
                                    proceedFenceAdmin={(item) => addFenceAdminApiHandler(item)}
                                />}
                        />
                    ) :
                        <NoRecordFound />
                    }
                </Modal>
            }
        </>
    )

}

type EmployeeTableProps = {
    tableDataSet?: Array<Employee>;
    employeeFenceId?: string;
    proceedFenceAdmin?:(item : Employee)=> void;

}


const EmployeeTable = ({ tableDataSet, employeeFenceId, proceedFenceAdmin }: EmployeeTableProps) => {
    return <div className='table-responsive'>
        <table className='table align-items-center table-flush'>
            <thead className='thead-light'>
                <tr>
                    <th scope='col'>{'Name'}</th>
                    <th scope='col'>{''}</th>
                </tr>

            </thead>
            <tbody>
                {
                    tableDataSet && tableDataSet.length > 0 && tableDataSet.map((item: Employee, index: number) => {
                        return <tr className='align-items-center' onClick={() => { if (proceedFenceAdmin) { proceedFenceAdmin(item) } }}>
                            <td style={{ whiteSpace: 'pre-wrap' }}  >{item.name}</td>
                            <td style={{ whiteSpace: 'pre-wrap' }} >{item.id === employeeFenceId ? <ImageView icon={Icons.TickActive} /> : <></>}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}

export default FenceAdmin;