import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { NAV_ITEM, ROUTE } from '@utils'
import { Header, Navbar } from '@modules'
import { Icons } from '@assets';

type RequireAuthProps = {
    children: React.ReactNode;
}


export const RequireAuth = ({ children }: RequireAuthProps) => {

    const [sidenavOpen, setSidenavOpen] = React.useState(true);


    const location = useLocation()
    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const { userLoggedIn, userDetails } = useSelector(
        (state: any) => state.AppReducer
    );

    if (!userLoggedIn) {
        return <Navigate to={ROUTE.ROUTE_LOGIN} state={{ path: location.pathname }} />
    }

    const conditionalNavbarItem = (navs: any) => {
        if (userDetails?.is_admin) {
            return navs
        } else if (userDetails?.is_branch_admin) {
            let filtered = navs.filter((el: any) => {
                return el.value !== 'WC' && el.value !== 'GS' 
            })
            return filtered
        }
    }

    const toggleSideNav = () => {

        if (document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-pinned");
            document.body.classList.add("g-sidenav-hidden");
        } else {
            document.body.classList.add("g-sidenav-pinned");
            document.body.classList.remove("g-sidenav-hidden");
        }
        setSidenavOpen(!sidenavOpen);
    };


    return (
        <>
            {userDetails && <Navbar
                routes={conditionalNavbarItem(NAV_ITEM)}
                toggleSideNav={toggleSideNav}
                sideNavOpen={sidenavOpen}
                logo={{
                    innerLink: '/',
                    imgSrc: Icons.LogoSmall,
                    imgAlt: '...',
                    text: '',
                }} />}
            <div className='main-content'>
                {dashboardDetails && dashboardDetails.user_details && <div className='sticky-top' >
                    <Header headerNavOpen={sidenavOpen} toggleHeaderNav={toggleSideNav}
                    /></div>}
                <div className='mx-3 my-4'>
                    {children}
                </div>
            </div>

        </>

    )
}

export default RequireAuth;
