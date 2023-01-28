import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ROUTE } from '@utils'
import { Header, Navbar } from '@modules'

type RequireAuthProps = {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {

    const location = useLocation()
    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const { userLoggedIn } = useSelector(
        (state: any) => state.AppReducer
    );

    if (!userLoggedIn) {
        return <Navigate to={ROUTE.ROUTE_LOGIN} state={{ path: location.pathname }} />
    }

    return (
        <>
            <Navbar />
            <div className='main-content'>
                {dashboardDetails && dashboardDetails.user_details && <div><Header /></div>}
                <div className='mx-3 my-4'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default RequireAuth;
