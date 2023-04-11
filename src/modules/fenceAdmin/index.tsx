import { Container, CommonTable, Modal, ImageView, Divider, NoRecordFound, InputText, Icon, Card, useKeyPress, } from '@components'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../dashboard/container'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBranchesList } from '../.././store/location/actions';
import { getEmployeesList, addFenceAdmin } from '../.././store/employee/actions';
import { Icons } from '@assets'

import { goTo, useNav, ROUTE, showToast } from '@utils'
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
    const enterPress = useKeyPress("Enter");
    const [model, setModel] = useState(false);
    const [branch, setBranch] = useState<any>([])
    const [searchEmployee, setSearchEmployee] = useState<any>('')
    const [selectedEmployeeFenceId, setSelectedEmployeeFenceId] = useState();
    const [selectedBranchId, setSelectedBranchId] = useState<any>();
    const [searchBranches, setsearchBranches] = useState<any>('')



    const { brancheslist } = useSelector(
        (state: any) => state.LocationReducer
    );

    const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
        (state: any) => state.EmployeeReducer
    );


    useEffect(() => {
        if (enterPress && model === false) {
            getAllBranchesListData()
        }
    }, [enterPress])

    useEffect(() => {
        getAllBranchesListData()
    }, [])

    const getAllBranchesListData = () => {

        const params = {
            ...(searchBranches && { q: searchBranches })
        };
        dispatch(
            getAllBranchesList({
                params,
                onSuccess: (response: any) => () => {
                    setBranch(response)
                },
                onError: () => () => {
                },
            })
        );
    }


    useEffect(() => {

        if (enterPress && model === true) {
            getRegisteredFenceAdmin(currentPage);
        }
    }, [enterPress])

    useEffect(() => {
        if (selectedBranchId) {
            getRegisteredFenceAdmin(currentPage)
        }
    }, [selectedBranchId])


    const normalizedBranchList = (data: any) => {
        return data.map((el: any) => {
            return {
                Branch: el.name
            };
        });
    };


    function getRegisteredFenceAdmin(pageNumber: number) {
        const params = {
            ...(searchEmployee && { q: searchEmployee }),
            page_number: pageNumber,
            ...(selectedBranchId && { branch_id: selectedBranchId.id })
        }
        dispatch(getEmployeesList({
            params,
            onSuccess: (success: any) => () => {
                success && success?.data.length > 0 && success?.data.map((item: any) => {
                    if (item?.id == selectedBranchId?.fence_admin_id) {
                        setSelectedEmployeeFenceId(item.id)
                    }
                })
            },
            onError: (error: any) => () => {
            },
        }))
    }

    // function getRegisteredFenceAdminDefault(id: string, pageNumber: number) {
    //     const params = {
    //         q: "",
    //         page_number: pageNumber,
    //         branch_id: id
    //     }
    //     dispatch(getEmployeesList({ params }))
    // }

    function paginationHandler(type: 'next' | 'prev' | 'current', position?: number) {
        let page = type === 'next' ? currentPage + 1 : type === 'prev' ? currentPage - 1 : position;
        getRegisteredFenceAdmin(page)
    }

    function addFenceAdminApiHandler(item: Employee) {
        const params = { branch_id: selectedBranchId.id, employee_id: item.id }

        dispatch(addFenceAdmin({
            params,
            onSuccess: (success: any) => () => {
                getAllBranchesListData()
                showToast("success", success.message);
                setModel(!model)
            },
            onError: (error: string) => () => {
                showToast("error", error);
            },
        }))

    }

    function proceedModelHandler(selectedBranch: any) {
        setSelectedBranchId(selectedBranch);
        setSelectedEmployeeFenceId(selectedBranch.fence_admin_id)
        // getRegisteredFenceAdmin(currentPage)
        setModel(!model)
    }

    const SelectedBranchFilter = () => {
        let filteredBranch = [...branch]
        if (searchBranches !== "") {
            filteredBranch = filteredBranch.filter((element: any) => {
                return element.name.replace(/\s/g, '').toLowerCase().includes(searchBranches.replace(/\s/g, '').toLowerCase())
            })
            setBranch(filteredBranch)
        }
        else {
            setBranch(brancheslist)
        }
    }

    return (
        <>
            <Card additionClass='mx-3'>
                <h2>{t('allRegisteredLocation')}</h2>
                <Container additionClass={"col-xl-4 ml--4 row"}>
                    <InputText
                        value={searchBranches}
                        col={'col-xl'}
                        placeholder={t("searchLocation")}
                        onChange={(e) => {
                            setsearchBranches(e.target.value);
                        }}
                    />
                    <Icon type={"btn-primary"} additionClass={'col-xl-2 mt-xl-2 mt-2 mt-sm-0 ml-3 ml-sm-0'} icon={Icons.Search}
                        onClick={() => {
                            SelectedBranchFilter()
                        }}
                    />
                </Container>
            </Card>
            {
                branch && branch.length > 0 ?
                    <CommonTable
                        displayDataSet={normalizedBranchList(branch)}
                        tableOnClick={(e, index, item) => {
                            let currentItem = branch[index];
                            proceedModelHandler(currentItem);
                        }}
                    />
                    : <Card additionClass={"mx-3"}><NoRecordFound /></Card>}

            {
                <Modal title={t('selectFenceAdminFromTheListBelow')} showModel={model} toggle={() => {
                    setModel(!model)
                    setSearchEmployee("")
                }}>
                    <Container additionClass={"col-xl-6 row"}>
                        <InputText
                            value={searchEmployee}
                            col={'col'}
                            placeholder={t("searchEmployee")}
                            onChange={(e) => {
                                setSearchEmployee(e.target.value);
                            }}
                        />
                        <Icon type={"btn-primary"} additionClass={'col-xl-3 mt-xl-2 mt-2 mt-sm-0'} icon={Icons.Search}
                            onClick={() => {
                                getRegisteredFenceAdmin(currentPage)
                            }}
                        />
                    </Container>
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
    employeeFenceId?: any;
    proceedFenceAdmin?: (item: Employee) => void;

}


const EmployeeTable = ({ tableDataSet, employeeFenceId, proceedFenceAdmin }: EmployeeTableProps) => {
    return <div className='table-responsive'>
        <table className='table align-items-center' style={{ marginBottom: '0px' }}>
            <thead className='thead-light'>
                <tr>
                    <th scope='col'>{'Name'}</th>
                    <th scope='col'>{''}</th>
                </tr>
            </thead>
            <tbody>
                {
                    tableDataSet && tableDataSet.length > 0 && tableDataSet.map((item: Employee, index: number) => {
                        return <tr className='align-items-center'
                            style={{ cursor: 'pointer' }}
                            onClick={() => { if (proceedFenceAdmin) { proceedFenceAdmin(item) } }}>
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