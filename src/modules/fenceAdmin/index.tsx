import { Container, CommonTable } from '@components'
import React, { useEffect } from 'react'
import { Navbar } from '../dashboard/container'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBranchesList } from '../.././store/location/actions'
import { goTo, useNav, ROUTE } from '@utils'
import { useTranslation } from "react-i18next";

function FenceAdmin() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNav()

    const { brancheslist } = useSelector(
        (state: any) => state.LocationReducer
    );

    useEffect(() => {
        dispatch(getAllBranchesList({}))
    }, [])


    const normalizedEmployeeLog = (data: any) => {
        console.log('ffffffff', data);

        return data.map((el: any) => {
            return {
                name: el.name
            };
        });
    };

    const manageBranchesHandler = (id: string | undefined) => {
        goTo(navigation, ROUTE.ROUTE_MANAGE_BRANCHES)
    }
    console.log("brancheslist", brancheslist)
    return (
        <>
            <Container>
                <Navbar />
                <Container additionClass='main-content'>
                    <Container>
                        <h1>{t('fenceAdmin')}</h1>
                    </Container>
                    {brancheslist && brancheslist.length > 0 && <CommonTable tableTitle={t("branches")} buttonOnClock={() => manageBranchesHandler(undefined)} tableDataSet={normalizedEmployeeLog(brancheslist)} tableValueOnClick={(e, index, item) => {
                        const current = brancheslist[index]
                        manageBranchesHandler(current.id)
                    }} />}
                </Container>
            </Container>
        </>
    )

}

export default FenceAdmin;