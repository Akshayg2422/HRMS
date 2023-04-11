import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ROUTE} from '@utils'

type RequireAuthExistProps = {
    children: React.ReactNode;
}

export const RequireAuthExist = ({ children }: RequireAuthExistProps) => {

    const location = useLocation()

    const { userLoggedIn } = useSelector(
        (state: any) => state.AppReducer
    );
    
    const {dashboardDetails} = useSelector(
        (state: any) => state.DashboardReducer
      );

      
    if (userLoggedIn && dashboardDetails?.user_details?.name) {
        return <Navigate to={ROUTE.ROUTE_DASHBOARD} state={{ path: location.pathname }} />
    }

    return <>{children}</>
}

export default RequireAuthExist;
