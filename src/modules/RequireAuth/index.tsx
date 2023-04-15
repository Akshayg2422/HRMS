import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { NAV_ITEM, ROUTE } from '@utils'
import { Header, Navbar } from '@modules'
import { Icons } from '@assets';

type RequireAuthProps = {
    children: React.ReactNode;
}

const routes = [
    {
        collapse: true,
        name: "Dashboards",
        icon: "ni ni-shop text-primary",
        state: "dashboardsCollapse",
        views: [
            {
                path: "/dashboard",
                name: "Dashboard",
                miniName: "D",
                component: <></>,
                layout: "/admin",
            },
            {
                path: "/alternative-dashboard",
                name: "Alternative",
                miniName: "A",
                component: <></>,
                layout: "/admin",
            },
        ],
    },
    {
        collapse: true,
        name: "Examples",
        icon: "ni ni-ungroup text-orange",
        state: "examplesCollapse",
        views: [
            {
                path: "/pricing",
                name: "Pricing",
                miniName: "P",
                component: <></>,
                layout: "/auth",
            },
            {
                path: "/login",
                name: "Login",
                miniName: "L",
                component: <></>,
                layout: "/auth",
            },
            {
                path: "/register",
                name: "Register",
                miniName: "R",
                component: <></>,
                layout: "/auth",
            },
            {
                path: "/lock",
                name: "Lock",
                miniName: "L",
                component: <></>,
                layout: "/auth",
            },
            {
                path: "/timeline",
                name: "Timeline",
                miniName: "T",
                component: <></>,
                layout: "/admin",
            },
            {
                path: "/profile",
                name: "Profile",
                miniName: "P",
                component: <></>,
                layout: "/admin",
            },
            {
                path: "/rtl-support",
                name: "RTL Support",
                miniName: "RS",
                component: <></>,
                layout: "/rtl",
            },
        ],
    },
];

export const RequireAuth = ({ children }: RequireAuthProps) => {

    const [sidenavOpen, setSidenavOpen] = React.useState(true);

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

            <Navbar
                routes={NAV_ITEM}
                toggleSideNav={toggleSideNav}
                sideNavOpen={sidenavOpen}
                logo={{
                    innerLink: '/',
                    imgSrc: Icons.LogoSmall,
                    imgAlt: '...',
                    text: '',
                }} />
            <div className='main-content'>
                {dashboardDetails && dashboardDetails.user_details && <div className='sticky-top' ><Header /></div>}
                <div className='mx-3 my-4'>
                    {children}
                </div>
            </div>

        </>

    )
}

export default RequireAuth;
